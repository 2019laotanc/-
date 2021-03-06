// import * as IconMap from './map';
import { User,  Lock, People, SettingTwo,DataFile,Calendar,Order,DashboardOne,EqualRatio,UserPositioning,MoreFour,Info} from '@icon-park/vue';

function toPascalCase(val) {
  return val.replace(/(^\w|-\w)/g, function (c) {
    return c.slice(-1).toUpperCase();
  });
}
var IconMap = {
  User,
  Lock,
  SettingTwo,
  People,
  DataFile,
  Calendar,
  Order,
  DashboardOne,
  EqualRatio,
  UserPositioning,
  MoreFour,
  Info
}
var options = {
  name: 'icon-park',
  props: ['type', 'theme', 'size', 'spin', 'fill', 'strokeLinecap', 'strokeLinejoin', 'strokeWidth'],
  inheritAttrs: true,
  render: function render(h) {
    var type = toPascalCase(this.type);
    var theme = this.theme,
        size = this.size,
        fill = this.fill,
        strokeLinecap = this.strokeLinecap,
        strokeLinejoin = this.strokeLinejoin,
        strokeWidth = this.strokeWidth,
        spin = this.spin;

    if (!(type in IconMap)) {
      throw new Error("".concat(type, " is not a valid icon type name"));
    }

    return h(IconMap[type], {
      props: {
        theme: theme,
        size: size,
        fill: fill,
        strokeLinecap: strokeLinecap,
        strokeLinejoin: strokeLinejoin,
        strokeWidth: strokeWidth,
        spin: spin
      }
    });
  }
};
export var IconPark = options;
export function install(Vue, prefix) {
  Object.values(IconMap).forEach(function (icon) {
    Vue.component(prefix ? prefix + '-' + icon.name.slice(5) : icon.name, icon);
  });
}