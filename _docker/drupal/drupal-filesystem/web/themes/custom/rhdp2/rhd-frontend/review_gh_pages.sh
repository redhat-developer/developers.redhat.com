#!/bin/sh

if [ "`git status -s`" ]
then
    echo "The working directory is dirty. Please commit any pending changes."
    exit 1;
fi

command -v hugo >/dev/null 2>&1 || { echo >&2 "I require hugo but it's not available in the PATH. Aborting."; exit 1; }
git config remote.upstream.url > /dev/null 2>&1 || { echo >&2 "I require an upstream remote for this repository to publish to gh-pages. Aborting."; exit 1;}

echo "Deleting old publication"
rm -rf public
mkdir public
git worktree prune
rm -rf .git/worktrees/public/

echo "Checking out gh-pages branch into public"
git worktree add -B gh-pages public origin/gh-pages

echo "Removing existing files"
rm -rf public/*

echo "Generating site"
hugo --environment review

echo "Updating gh-pages branch"
cd public && git add --all && git commit -m "Publishing to gh-pages (publish.sh)"

echo "Pushing gh-pages branch to upstream remote"
git push upstream gh-pages
