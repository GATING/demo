import { Button, Modal, Form, AutoComplete, Select } from "ant-design-vue";

export default function(app) {
  app.use(Button);
  app.use(Modal);
  app.use(Form);
  app.use(AutoComplete);
  app.use(Select);
}
