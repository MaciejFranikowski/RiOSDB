import express from 'express';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../../database/entities/User';
import { ValidateBody } from '../../util/validation';
import CreateNewUserModel from './models/CreateNewUserModel';
import LoginUserModel from './models/LoginUserModel';

export default class AuthService {
  private genSaltRounds = 10;

  private userRepository: Repository<User>;

  private jwtSecretKey: string;

  constructor(userRepository: Repository<User>, jwtSecretKey: string) {
    this.userRepository = userRepository;
    this.jwtSecretKey = jwtSecretKey;
  }

  async getUser(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  async getUserPassHash(userId: number): Promise<string> {
    const user = await this.userRepository.findOne(
      {
        where: { id: userId },
        select: { passHash: true },
      },
    );
    if (!user) { throw new Error('User not found in database'); }
    return user.passHash;
  }

  async createUser({
    firstName,
    lastName,
    email,
    password,
  }: CreateNewUserModel): Promise<User> {
    const salt = await bcrypt.genSalt(this.genSaltRounds);

    const newUser = await this.userRepository.save(
      this.userRepository.create({
        firstName,
        lastName,
        email,
        passHash: await bcrypt.hash(password, salt),
      }),
    );

    return newUser;
  }

  @ValidateBody(CreateNewUserModel)
  async registerUser(req: express.Request, res: express.Response) {
    const { email } = req.body;
    const user = await this.getUser(email);
    if (user) {
      return res
        .status(400)
        .json({ error: 'User with that email already exists!' });
    }

    let newUser: User;
    try {
      newUser = await this.createUser(req.body);
    } catch (e) {
      if (e instanceof Error) return res.status(400).json({ Prror: e.message });
      return res
        .status(400)
        .json({ error: 'Unknow error occured while registering new user!' });
    }
    const { passHash, ...userWithoutPassword } = newUser;
    return res.status(201).json(userWithoutPassword);
  }

  @ValidateBody(LoginUserModel)
  async loginUser(req: express.Request, res: express.Response) {
    const { email, password } = req.body;
    const user = await this.getUser(email);
    if (!(user && await bcrypt.compare(password, await this.getUserPassHash(user.id)))) {
      return res
        .status(401)
        .json({ error: 'Incorrect username or password' });
    }
    const { passHash, ...userWithoutPassword } = user;
    return res.status(200).json({
      user: userWithoutPassword,
      token: jwt.sign({
        time: Date(),
        userId: user.id,
      }, this.jwtSecretKey),
    });
  }
}
