import fs from 'node:fs/promises';
import process from 'node:process';

interface PackageJson {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
}

// Error: getaddrinfo EAI_AGAIN registry.npmjs.org
const retryFetch = async (url: string, retry = 3): Promise<Response> => {
  try {
    return await fetch(url);
  } catch (e) {
    if (retry > 0) {
      return retryFetch(url, retry - 1);
    }
    throw e;
  }
};

const versionPromiseCache: Record<string, Promise<string>> = {};
const getPkgLatestVersion = async (pkgName: string): Promise<string> => {
  return (versionPromiseCache[pkgName] ||= retryFetch(
    `https://registry.npmjs.org/${pkgName}/latest`,
  )
    .then((r) => r.json())
    .then((r) => r.version));
};

const pkgFpList = (await fs.readdir(process.cwd()))
  .filter((v) => v.startsWith('template-'))
  .map((v) => v + '/package.json');

const reactPkgList = ['react', 'react-dom', '@types/react', '@types/react-dom'];

const updateDependencies = async (
  text: string,
  dependencies: Record<string, string> | undefined,
): Promise<string> => {
  if (!dependencies) return text;
  let newTxt = text;
  const tasks = Object.entries(dependencies).map(
    async ([pkgName, oldPkgVersion]) => {
      const newVersion = await getPkgLatestVersion(pkgName);
      if (reactPkgList.includes(pkgName) && !newVersion.startsWith('18.')) {
        return;
      }
      const oldVersion = '1234567890'.includes(oldPkgVersion[0])
        ? oldPkgVersion
        : oldPkgVersion.slice(1);
      if (oldVersion !== newVersion) {
        const newPkgVersion =
          oldPkgVersion === oldVersion
            ? oldPkgVersion
            : `${oldPkgVersion[0]}${newVersion}`;
        newTxt = newTxt.replace(
          `"${pkgName}": "${oldPkgVersion}"`,
          `"${pkgName}": "${newPkgVersion}"`,
        );
        console.log(`${pkgName}: ${oldPkgVersion} -> ${newPkgVersion}`);
      }
    },
  );
  await Promise.all(tasks);
  return newTxt;
};

for (const pkgFp of pkgFpList) {
  const text = await fs.readFile(pkgFp, 'utf-8');
  console.log(pkgFp);
  let newTxt = text;
  const pkg = JSON.parse(text) as PackageJson;
  newTxt = await updateDependencies(newTxt, pkg.dependencies);
  newTxt = await updateDependencies(newTxt, pkg.devDependencies);
  if (text !== newTxt) {
    await fs.writeFile(pkgFp, newTxt, 'utf-8');
    console.log('Update completed\n');
  } else {
    console.log('No Updates\n');
  }
}

//
