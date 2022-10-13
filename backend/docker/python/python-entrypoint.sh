#!/bin/bash

PYTHON_FILE=$1
TEXT_INPUT=$2

python3 "$PYTHON_FILE" <<< "$TEXT_INPUT"
