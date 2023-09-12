if [[ -d "$HOME/goinfre/42cursus" ]]
then
  echo "- the directory exists. : ~/goinfre/42cursus"
else
  git clone https://github.com/seungwonme/42cursus.git $HOME/goinfre/42cursus
  echo "- the directory added. : ~/goinfre/42cursus"
fi

if [[ -d "$HOME/goinfre/C-Practice" ]]
then
  echo "- the directory exists. : ~/goinfre/C-Practice"
else
  git clone https://github.com/seungwonme/C-Practice.git $HOME/goinfre/C-Practice
  echo "- the directory added. : ~/goinfre/C-Practice"
fi

if [[ -d "$HOME/goinfre/Minishell" ]]
then
  echo "- the directory exists. : ~/goinfre/Minishell"
else
  git clone https://github.com/seungwonme/Minishell.git $HOME/goinfre/Minishell
  echo "- the directory added. : ~/goinfre/Minishell"
fi

if [[ -d "$HOME/goinfre/.brew" ]]
then
  echo "- the directory exists. : ~/goinfre/.brew"
else
  mkdir goinfre/.brew && curl -L https://github.com/Homebrew/brew/tarball/master | tar xz --strip 1 -C goinfre/.brew
  echo "- the directory added. : ~/goinfre/.brew"
fi
