# Project "FOSS-OnlineJudge" (temporary name)

## Broad idea

Our goal is to create free and open-source "online judge" solution for coding practise and knowledge evaluation, primarly dedicated for educational purposes e.g. at schools or universities.
The description of exercise is added to the web app with an example of how the final solution should work. Also the creator prepares test data, so after a completion by a student it can be used for testing for possible code flaws. Finally the person completing the task receives results of his run showcasing passed and failed tests (possibly without showing concrete input).

## Functionalities

Main functionalities:
- complex runtime environment with broad behavior testing capabilities
- task creation (description, desired output, hidden tests)
- "exam mode" - dedicated URLs for personalised exercise sets with feedback for exam creator
- support for: C++, Java, Python

Further expansion:
- user profiles with exercise history
- gathering tests into categories or sets
- score boards with best solutions
- viewable previous solutions from other users
- adding broader language support

## Technical specifiation

- Web application
- Frontend: React
- Backend: Node.js
- Utilities: Docker, docker-compose, nginx
- Programming languages: JS/TypeScript (+ supported languages in online judge)
