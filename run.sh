# builds and then runs the application
./build.sh

if [ $? -eq 0 ]
then
  echo "Successfully built bundle"
  ./serve.sh
else
  echo "\n================="
  echo "| BUILD ERROR   |"
  echo "| Aborting run. |"
  echo "=================\n">&2
fi
