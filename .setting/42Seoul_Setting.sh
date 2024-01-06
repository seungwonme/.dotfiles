if [[ -d "$HOME/goinfre/42cursus" ]]
then
  echo "- the directory exists. : ~/goinfre/42cursus"
else
  git clone https://github.com/seungwonme/42cursus.git $HOME/goinfre/42cursus
  echo "- the directory added. : ~/goinfre/42cursus"
fi

if [[ -d "$HOME/goinfre/blog" ]]
then
  echo "- the directory exists. : ~/goinfre/blog"
else
  git clone https://github.com/seungwonme/seungwonme.github.io.git $HOME/goinfre/blog
  echo "- the directory added. : ~/goinfre/blog"
fi

if [[ -d "$HOME/goinfre/.brew" ]]
then
  echo "- the directory exists. : ~/goinfre/.brew"
else
  mkdir goinfre/.brew && curl -L https://github.com/Homebrew/brew/tarball/master | tar xz --strip 1 -C goinfre/.brew
  echo "- the directory added. : ~/goinfre/.brew"
fi
