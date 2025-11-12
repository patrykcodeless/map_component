export default {
  editor: {
    label: {
      en: "Simple Text",
    },
    icon: "text",
  },
  properties: {
    text: {
      label: { en: "Text Content" },
      type: "Text",
      section: "settings",
      defaultValue: "Hello from WeWeb!",
      bindable: true,
      /* wwEditor:start */
      bindingValidation: {
        type: "string",
        tooltip: "Text to display",
      },
      propertyHelp: "Enter the text you want to display",
      /* wwEditor:end */
    },
  },
};
