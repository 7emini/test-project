import { reactive } from "vue";

export function configHook() {
  // 配置项目
  const config = reactive({
    selection: true,
    batch_delete: true,
    patination: true,
  });

  /**
   * 初始化配置
   * @param {*} data
   * @returns
   */
  const configInit = (data = {}) => {
    if (JSON.stringify(data) === "{}") {
      return false;
    }
    const config_keys = Object.keys(config);

    for (let data_key in data) {
      if (!data.hasOwnProperty(data_key)) {
        continue;
      }
      if (config_keys.includes(data_key)) {
        config[data_key] = data[data_key];
      }
    }
  };
  return { config, configInit };
}
