import os
import os.path
import re

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
dir = ROOT_DIR + "/repos/"


for name in os.listdir(dir):
    path = os.path.join(dir, name)
    if os.path.isdir(path):
        os.chdir(path)
        os.system("git log --format=format:\'Commiter name: %an\' | sort | uniq -c | sort -nr | head -50 > log.txt")
        os.chdir(ROOT_DIR)


projectCommit = {}

for name in os.listdir(dir):
    path = os.path.join(dir, name)
    if os.path.isdir(path):
        os.chdir(path)
        f = open("log.txt", "r")
        pattern = re.compile("\s(?P<commits>[0-9]+) Commiter name: (?P<name>([\w]?[0-9]?)+)")
        projectCommit[name] = {}

        for match in pattern.findall(f.read()):
            commitNumber = match[0]
            nameUser = match[1]
            (projectCommit[name])[nameUser] = commitNumber

os.chdir(ROOT_DIR)

print(projectCommit)

for name in os.listdir(dir):
    path = os.path.join(dir, name)
    if os.path.isdir(path):
        os.chdir(path)

        print("project name: " + name)
        (projectCommit[name])["libs"] = {}

        for root, dirs, files in os.walk(path):
            for f in files:
                if f.endswith(".swift"):
                    fullpath = os.path.join(root, f)

                    swiftFile = open(fullpath, "r").read()
                    print("analizing " + f)

                    importPattern = re.compile("\s*import\s+(?P<library>[A-Z][a-zA-Z]+)\s?")
                    for importName in importPattern.findall(swiftFile):
                        print("found " + importName)
                        if importName in ((projectCommit[name])["libs"]):
                            ((projectCommit[name])["libs"])[importName] += 1
                        else:
                            ((projectCommit[name])["libs"])[importName] = 1

os.chdir(ROOT_DIR)

import json
with open('result.json', 'w') as fp:
    json.dump(projectCommit,fp)
