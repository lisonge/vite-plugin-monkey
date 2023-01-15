foreach ($file in Get-ChildItem){
  if($file.name -like 'template-*'){
    cd $file.name
    pnpm --ignore-workspace install
    pnpm --ignore-workspace update --latest
    pnpm --ignore-workspace build
    cd ..
  }
}
