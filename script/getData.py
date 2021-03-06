from git import Repo
import os
import urllib2
import json

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
token = ""
content = urllib2.urlopen("https://api.github.com/user/repos?access_token="+token)
data = json.load(content)

for repo in data:
    dir = ROOT_DIR + "/repos/" + repo["name"]
    print("clone repo" + repo["name"])
    url = repo["clone_url"].replace("https://", "https://botineo:botineobunitineo@")
    Repo.clone_from(url, dir, branch="master")

print("finishing cloning repos")
