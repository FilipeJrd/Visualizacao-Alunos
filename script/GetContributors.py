from git import Repo
import os
import urllib2
import json
import os.path
import re

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
dir = ROOT_DIR + "/repos/"
token = ""
content = urllib2.urlopen("https://api.github.com/user/repos?access_token="+token)
data = json.load(content)

repos = {}

def filterUserData(user):
    filteredUser = {}

    filteredUser["login"] = user["login"]
    filteredUser["avatar"] = user["avatar_url"]
    filteredUser["id"] = user["id"]

    return filteredUser

def isNotBotineo(user):
    return (user["login"] != "botineo")

print("Started getting Repo`s contributors...")
for repo in data:
    print("Getting "+repo["name"]+" Contributors...")
    contributorsUrl = "https://api.github.com/repos/"+repo["full_name"]+"/collaborators?access_token="+token
    print(contributorsUrl)
    contributorsContent = urllib2.urlopen(contributorsUrl)
    contributorsData = json.load(contributorsContent)

    

    users = filter(isNotBotineo,map(filterUserData, contributorsData))
    cont = {"users":users}

    repos[repo["name"]] = cont


for name in os.listdir(dir):
    path = os.path.join(dir, name)
    if os.path.isdir(path):
        os.chdir(path)

        print("project name: " + name)
        (repos[name])["libs"] = {}

        for root, dirs, files in os.walk(path):
            for f in files:
                if f.endswith(".swift"):
                    fullpath = os.path.join(root, f)

                    swiftFile = open(fullpath, "r").read()
                    print("analizing " + f)

                    importPattern = re.compile("\s*import\s+(?P<library>[A-Z][a-zA-Z]+)\s?")
                    for importName in importPattern.findall(swiftFile):
                        print("found " + importName)
                        if importName in ((repos[name])["libs"]):
                            ((repos[name])["libs"])[importName] += 1
                        else:
                            ((repos[name])["libs"])[importName] = 1

os.chdir(ROOT_DIR)


# now write output to a file
twitterDataFile = open("result2.json", "w")
# magic happens here to make it pretty-printed
twitterDataFile.write(json.dumps(repos, indent=4, sort_keys=True))
twitterDataFile.close()