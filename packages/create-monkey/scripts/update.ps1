pnpm exec tsx "./scripts/update_template_dependency.ts"

foreach ($file in Get-ChildItem){
  if($file.name -like 'template-*'){
    cd $file.name
    npm install
    npm run build
    cd ..
  }
}
