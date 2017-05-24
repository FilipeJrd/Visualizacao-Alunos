import os
import os.path

ROOT_DIR = os.path.dirname(os.path.abspath(__file__))
dir = ROOT_DIR + "/repos/"

for name in os.listdir(dir):
    path = os.path.join(dir, name)
    if os.path.isdir(path):
        os.chdir(path)
        os.system("git log --format=format:\'Commiter name: %an\' | sort | uniq -c | sort -nr | head -50 > log.txt")
        os.chdir(ROOT_DIR)
