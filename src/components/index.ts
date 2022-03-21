import Col from 'vant/lib/col/Col'
import 'vant/lib/col/index.css'
import Row from 'vant/lib/row/Row'
import 'vant/lib/row/index.css'

import MyLayout from './layout/MyLayout.vue'

const components: any = {
  CLayout: MyLayout,
  CRow: Row,
  CCol: Col
}
const install = (app: any) => {
  Object.keys(components).forEach((key) => {
    if (key === 'CRow' || key === 'CCol') {
      app.component(key, components[key])
    } else {
      console.log(components[key])
      app.component(components[key].name, components[key])
    }
  })
}

const Mui = {
  install
}
export default Mui
