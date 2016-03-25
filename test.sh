#!/bin/zsh

autoload -U colors && colors

for l in samples/*; do
  echo "Testing ${l}"
  for i in samples/${l:t}/*.*(.); do
    found=$(./lib/genstrings.js -p $i | grep -E "^ *\"label\":" | wc -l | sed "s/[^0-9]//g" );
    exist=$(grep -E "\\bTMLLocalizedString *\(" $i | wc -l | sed "s/[^0-9]//g" ); 
    if [[ $found -eq $exist ]]; then
      echo "$fg[green]$i $found $exist $reset_color";
    else
      echo "$fg[red]$i $found $exist $reset_color";
    fi
  done
  echo
done