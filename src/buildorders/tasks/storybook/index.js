import path    from 'path'
import taskAPI from 'taskAPI'

export default async function storybook() {
  await taskAPI.addPackages({
    devPackages: ['@storybook/addon-knobs', '@storybook/react'],
  })
  await taskAPI.addToPackageJson({
    json: {
      scripts: {
        storybook: `NODE_PATH=./src ./node_modules/@storybook/react/bin/index.js -p 9002 -c .storybook`,
      },
    },
  })
  await taskAPI.copyDirectory({
    src: path.resolve(__dirname, './templates'),
    dest: '.storybook',
  })
}
