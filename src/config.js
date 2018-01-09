import path from 'path'

export default {
  DEFAULT_TASK_DIR: path.resolve(__dirname, './buildorders/tasks'),
  DEFAULT_BUILD_ORDERS_DIR: path.resolve(
    __dirname,
    './buildorders/buildorders',
  ),
}
