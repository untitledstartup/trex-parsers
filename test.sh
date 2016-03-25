#!/bin/zsh

autoload -U colors && colors

echo "Testing Obj-C"

for i in samples/**/*.*(.); do
  found=$(./lib/genstrings.js $i | sed -e 's/,/\'$'\n/g' | grep -E "^\[?{\"label\":" | wc -l | sed "s/[^0-9]//g" );
  exist=$(grep -E "\\bTMLLocalizedString *\(" $i | wc -l | sed "s/[^0-9]//g" ); 
  if [[ $found -eq $exist ]]; then
    echo "$fg[green]$i $found $exist $reset_color";
  else
    echo "$fg[red]$i $found $exist $reset_color";
  fi
done
