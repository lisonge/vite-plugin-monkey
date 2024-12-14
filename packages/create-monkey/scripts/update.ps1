foreach ($file in Get-ChildItem){
  if($file.name -like 'template-*'){
    cd $file.name
    npm install
    npm update --latest
    npm run build
    cd ..
  }
}
