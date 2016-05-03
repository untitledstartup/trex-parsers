#!/bin/zsh

autoload -U colors && colors

typeset -a langs
langs=($@)

if [[ ${#langs} -eq 0 ]]; then
  langs=(samples/*)
fi

for l in ${langs[@]}; do
  l=${l:t}
  echo "Testing ${l}"
  for i in samples/$l/*.*(.); do
    found=$(./genstrings -p $i | grep -E "^ *\"label\":" | wc -l | sed "s/[^0-9]//g" );
    exist=0
    if [[ $l = "objc" ]] || [[ $l = "swift" ]]; then
      exist=$(sed -Ef stripComments.sed $i | grep -E "\\bTMLLocalizedString *\(" | wc -l | sed "s/[^0-9]//g" ); 
    elif [[ $l = "html" ]]; then
      exist=$(egrep "<[^>]*tml-tr|{{.*(trl\(|\| *trl\b)" $i | egrep -v "<[^>]*\bbad\b" | wc -l | sed "s/[^0-9]//g");
    fi
    if [[ $found -eq $exist ]]; then
      echo "$fg[green]$i $found $exist $reset_color";
    else
      echo "$fg[red]$i $found $exist $reset_color";
    fi
  done
  echo
done
