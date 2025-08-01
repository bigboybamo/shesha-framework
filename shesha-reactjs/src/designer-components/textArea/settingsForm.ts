import { DesignerToolbarSettings } from "@/index";
import { nanoid } from "@/utils/uuid";
import { FormLayout } from "antd/lib/form/Form";
import { getBorderInputs, getCornerInputs } from "../_settings/utils/border/utils";
import { fontTypes, fontWeightsOptions, textAlignOptions } from "../_settings/utils/font/utils";
import { positionOptions, repeatOptions, sizeOptions } from "../_settings/utils/background/utils";

export const getSettings = (data: any) => {
  const searchableTabsId = nanoid();
  const commonTabId = nanoid();
  const validationId = nanoid();
  const eventsTabId = nanoid();
  const appearanceId = nanoid();
  const securityId = nanoid();
  const styleRouterId = nanoid();
  const pnlFontStyleId = nanoid();
  const dimensionsStylePnlId = nanoid();
  const borderStylePnlId = nanoid();

  const propertyNameId = nanoid();
  const hiddenId = nanoid();
  const shadowStylePnlId = nanoid();

  return {
    components: new DesignerToolbarSettings(data)
      .addSearchableTabs({
        id: searchableTabsId,
        propertyName: 'settingsTabs',
        parentId: 'root',
        label: 'Settings',
        hideLabel: true,
        labelAlign: 'right',
        size: 'small',
        tabs: [
          {
            key: 'common',
            title: 'Common',
            id: commonTabId,
            components: [...new DesignerToolbarSettings()
              .addContextPropertyAutocomplete({
                id: propertyNameId,
                propertyName: "propertyName",
                parentId: commonTabId,
                label: "Property Name",
                size: "small",
                validate: {
                  "required": true
                },
                styledLabel: true,
                jsSetting: true,
              })
              .addLabelConfigurator({
                id: nanoid(),
                propertyName: 'hideLabel',
                label: 'Label',
                parentId: commonTabId,
                hideLabel: true,
              })
              .addSettingsInputRow({
                id: nanoid(),
                parentId: commonTabId,
                inputs: [
                  {
                    type: 'textField',
                    id: `placeholder-${commonTabId}`,
                    propertyName: 'placeholder',
                    label: 'Placeholder',
                    size: 'small',
                    jsSetting: true,
                  },
                  {
                    type: 'textArea',
                    id: `tooltip-${commonTabId}`,
                    propertyName: 'description',
                    label: 'Tooltip',
                    jsSetting: true,
                  },
                ],
              })
              .addSettingsInputRow({
                id: nanoid(),
                parentId: commonTabId,
                inputs: [
                  {
                    type: 'textField',
                    id: nanoid(),
                    propertyName: "initialValue",
                    parentId: commonTabId,
                    label: "Default Value",
                    jsSetting: true,
                    size: "small",
                  },
                  {
                    type: 'switch',
                    id: nanoid(),
                    propertyName: 'passEmptyStringByDefault',
                    label: 'Empty As Default',
                    jsSetting: true,
                    parentId: commonTabId,
                  }
                ]
              })
              .addSettingsInputRow({
                id: nanoid(),
                parentId: commonTabId,
                inputs: [
                  {
                    type: 'switch',
                    id: nanoid(),
                    propertyName: 'autoSize',
                    parentId: commonTabId,
                    label: 'Auto Size',
                    defaultValue: false,
                    jsSetting: true,
                  },
                  {
                    type: 'switch',
                    id: nanoid(),
                    propertyName: 'allowClear',
                    parentId: commonTabId,
                    label: 'Allow Clear',
                    jsSetting: true,
                  }
                ]
              })
              .addSettingsInputRow({
                id: nanoid(),
                parentId: commonTabId,
                inputs: [
                  {
                    type: 'editModeSelector',
                    id: nanoid(),
                    propertyName: 'editMode',
                    label: 'Edit Mode',
                    defaultValue: 'inherited',
                    size: 'small',
                    jsSetting: true,
                  },
                  {
                    type: 'switch',
                    id: hiddenId,
                    propertyName: 'hidden',
                    label: 'Hide',
                    jsSetting: true,
                    layout: 'horizontal',
                  },
                ],
              })
              .addSettingsInputRow({
                id: nanoid(),
                parentId: commonTabId,
                inputs: [
                  {
                    type: 'switch',
                    id: nanoid(),
                    propertyName: 'showCount',
                    parentId: commonTabId,
                    label: 'Show Chars Count',
                    jsSetting: false,
                  },
                  {
                    type: 'switch',
                    id: nanoid(),
                    propertyName: 'spellCheck',
                    parentId: commonTabId,
                    label: 'Spell Check',
                  }
                ],
              })
              .toJson()
            ]
          },
          {
            key: 'validation',
            title: 'Validation',
            id: validationId,
            components: [
              ...new DesignerToolbarSettings()
                .addSettingsInput({
                  id: nanoid(),
                  propertyName: 'validate.required',
                  label: 'Required',
                  inputType: 'switch',
                  size: 'small',
                  layout: 'horizontal',
                  jsSetting: true,
                  parentId: validationId
                })
                .addSettingsInputRow({
                  id: nanoid(),
                  parentId: validationId,
                  inputs: [
                    {
                      type: 'numberField',
                      id: nanoid(),
                      propertyName: 'validate.minLength',
                      label: 'Min Length',
                      size: 'small',
                      jsSetting: true,
                    },
                    {
                      type: 'numberField',
                      id: nanoid(),
                      propertyName: 'validate.maxLength',
                      label: 'Max Length',
                      size: 'small',
                      jsSetting: true,
                    },
                  ],
                })
                .addSettingsInputRow({
                  id: nanoid(),
                  parentId: validationId,
                  inputs: [
                    {
                      id: nanoid(),
                      propertyName: "validate.message",
                      parentId: validationId,
                      label: "Message",
                      validate: {},
                      version: 3,
                      type: "textField",
                      jsSetting: true,
                    },
                    {
                      type: 'codeEditor',
                      id: nanoid(),
                      propertyName: 'validate.validator',
                      label: 'Validator',
                      labelAlign: 'right',
                      tooltip: 'Enter custom validator logic for form.item rules. Returns a Promise',
                    }
                  ],
                })
                .toJson()
            ]
          },
          {
            key: 'events',
            title: 'Events',
            id: eventsTabId,
            components: [
              ...new DesignerToolbarSettings()
                .addSettingsInput({
                  id: nanoid(),
                  inputType: 'codeEditor',
                  propertyName: 'onChangeCustom',
                  label: 'On Change',
                  labelAlign: 'right',
                  tooltip: 'Enter custom eventhandler on changing of event.',
                  parentId: eventsTabId
                })
                .addSettingsInput({
                  id: nanoid(),
                  inputType: 'codeEditor',
                  propertyName: 'onFocusCustom',
                  label: 'On Focus',
                  labelAlign: 'right',
                  tooltip: 'Enter custom eventhandler on focus of event.',
                  parentId: eventsTabId
                })
                .addSettingsInput({
                  id: nanoid(),
                  inputType: 'codeEditor',
                  propertyName: 'onBlurCustom',
                  label: 'On Blur',
                  labelAlign: 'right',
                  tooltip: 'Enter custom eventhandler on blur of event.',
                  parentId: eventsTabId
                })
                .toJson()
            ]
          },
          {
            key: 'appearance',
            title: 'Appearance',
            id: appearanceId,
            components: [
              ...new DesignerToolbarSettings()
                .addPropertyRouter({
                  id: styleRouterId,
                  propertyName: 'propertyRouter1',
                  componentName: 'propertyRouter',
                  label: 'Property router1',
                  labelAlign: 'right',
                  parentId: appearanceId,
                  hidden: false,
                  propertyRouteName: {
                    _mode: "code",
                    _code: "    return contexts.canvasContext?.designerDevice || 'desktop';",
                    _value: ""
                  },
                  components: [
                    ...new DesignerToolbarSettings()
                      .addSettingsInput({
                        id: nanoid(),
                        parentId: styleRouterId,
                        propertyName: 'enableStyleOnReadonly',
                        label: 'Enable Style On Readonly',
                        tooltip: 'Removes all visual styling except typography when the component becomes read-only',
                        inputType: 'switch',
                        jsSetting: true
                      })
                      .addCollapsiblePanel({
                        id: nanoid(),
                        propertyName: 'pnlFontStyle',
                        label: 'Font',
                        labelAlign: 'right',
                        parentId: styleRouterId,
                        ghost: true,
                        collapsible: 'header',
                        content: {
                          id: pnlFontStyleId,
                          components: [...new DesignerToolbarSettings()
                            .addSettingsInputRow({
                              id: nanoid(),
                              parentId: pnlFontStyleId,
                              inline: true,
                              propertyName: 'font',
                              inputs: [
                                {
                                  type: 'dropdown',
                                  id: `fontFamily-${styleRouterId}`,
                                  label: 'Family',
                                  propertyName: 'font.type',
                                  hideLabel: true,
                                  dropdownOptions: fontTypes,
                                },
                                {
                                  type: 'numberField',
                                  id: `fontSize-${styleRouterId}`,
                                  label: 'Size',
                                  propertyName: 'font.size',
                                  hideLabel: true,
                                  width: 50,
                                },
                                {
                                  type: 'dropdown',
                                  id: `fontWeight-${styleRouterId}`,
                                  label: 'Weight',
                                  propertyName: 'font.weight',
                                  hideLabel: true,
                                  tooltip: "Controls text thickness (light, normal, bold, etc.)",
                                  dropdownOptions: fontWeightsOptions,
                                  width: 100,
                                },
                                {
                                  type: 'colorPicker',
                                  id: `fontColor-${styleRouterId}`,
                                  label: 'Color',
                                  hideLabel: true,
                                  propertyName: 'font.color',
                                },
                                {
                                  type: 'dropdown',
                                  id: `fontAlign-${styleRouterId}`,
                                  label: 'Align',
                                  propertyName: 'font.align',
                                  hideLabel: true,
                                  width: 60,
                                  dropdownOptions: textAlignOptions,
                                },
                              ],
                            })
                            .toJson()
                          ]
                        }
                      })
                      .addCollapsiblePanel({
                        id: 'dimensionsStyleCollapsiblePanel',
                        propertyName: 'pnlDimensions',
                        label: 'Dimensions',
                        parentId: styleRouterId,
                        labelAlign: 'right',
                        ghost: true,
                        collapsible: 'header',
                        content: {
                          id: dimensionsStylePnlId,
                          components: [...new DesignerToolbarSettings()
                            .addSettingsInputRow({
                              id: nanoid(),
                              parentId: dimensionsStylePnlId,
                              inline: true,
                              inputs: [
                                {
                                  type: 'textField',
                                  id: `width-${styleRouterId}`,
                                  label: "Width",
                                  width: 85,
                                  propertyName: "dimensions.width",
                                  icon: "widthIcon",
                                  tooltip: "You can use any unit (%, px, em, etc). px by default if without unit"
                                },
                                {
                                  type: 'textField',
                                  id: `minWidth-${styleRouterId}`,
                                  label: "Min Width",
                                  width: 85,
                                  hideLabel: true,
                                  propertyName: "dimensions.minWidth",
                                  icon: "minWidthIcon",
                                },
                                {
                                  type: 'textField',
                                  id: `maxWidth-${styleRouterId}`,
                                  label: "Max Width",
                                  width: 85,
                                  hideLabel: true,
                                  propertyName: "dimensions.maxWidth",
                                  icon: "maxWidthIcon",
                                }
                              ]
                            })
                            .addSettingsInputRow({
                              id: nanoid(),
                              parentId: dimensionsStylePnlId,
                              inline: true,
                              inputs: [
                                {
                                  type: 'textField',
                                  id: `height-${dimensionsStylePnlId}`,
                                  label: "Height",
                                  width: 85,
                                  propertyName: "dimensions.height",
                                  icon: "heightIcon",
                                  tooltip: "You can use any unit (%, px, em, etc). px by default if without unit"
                                },
                                {
                                  type: 'textField',
                                  id: `minHeight-${dimensionsStylePnlId}`,
                                  label: "Min Height",
                                  width: 85,
                                  hideLabel: true,
                                  propertyName: "dimensions.minHeight",
                                  icon: "minHeightIcon",
                                },
                                {
                                  type: 'textField',
                                  id: `maxHeight-${dimensionsStylePnlId}`,
                                  label: "Max Height",
                                  width: 85,
                                  hideLabel: true,
                                  propertyName: "dimensions.maxHeight",
                                  icon: "maxHeightIcon",
                                }
                              ]
                            })
                            .addSettingsInput({
                              id: nanoid(),
                              inputType: 'dropdown',
                              propertyName: 'size',
                              label: 'Size',
                              width: '150px',
                              hidden: { _code: 'return getSettingValue(data?.dimensions?.width) || getSettingValue(data?.dimensions?.height);', _mode: 'code', _value: false } as any,
                              dropdownOptions: [
                                { value: 'small', label: 'Small' },
                                { value: 'medium', label: 'Medium' },
                                { value: 'large', label: 'Large' },
                              ]
                            })
                            .toJson()
                          ]
                        }
                      })
                      .addCollapsiblePanel({
                        id: nanoid(),
                        propertyName: 'pnlBorderStyle',
                        label: 'Border',
                        labelAlign: 'right',
                        ghost: true,
                        parentId: styleRouterId,
                        collapsible: 'header',
                        content: {
                          id: borderStylePnlId,
                          components: [...new DesignerToolbarSettings()

                            .addContainer({
                              id: 'borderStyleRow',
                              parentId: 'borderStylePnl',
                              components: getBorderInputs() as any
                            })
                            .addContainer({
                              id: 'borderRadiusStyleRow',
                              parentId: 'borderStylePnl',
                              components: getCornerInputs() as any
                            })
                            .toJson()
                          ]
                        }
                      })
                      .addCollapsiblePanel({
                        id: 'backgroundStyleCollapsiblePanel',
                        propertyName: 'pnlBackgroundStyle',
                        label: 'Background',
                        labelAlign: 'right',
                        ghost: true,
                        parentId: 'styleRouter',
                        collapsible: 'header',
                        content: {
                          id: 'backgroundStylePnl',
                          components: [
                            ...new DesignerToolbarSettings()
                              .addSettingsInput({
                                id: "backgroundStyleRow-selectType",
                                parentId: "backgroundStylePnl",
                                label: "Type",
                                jsSetting: false,
                                propertyName: "background.type",
                                inputType: "radio",
                                tooltip: "Select a type of background",
                                buttonGroupOptions: [
                                  {
                                    value: "color",
                                    icon: "FormatPainterOutlined",
                                    title: "Color"
                                  },
                                  {
                                    value: "gradient",
                                    icon: "BgColorsOutlined",
                                    title: "Gradient"
                                  },
                                  {
                                    value: "image",
                                    icon: "PictureOutlined",
                                    title: "Image"
                                  },
                                  {
                                    value: "url",
                                    icon: "LinkOutlined",
                                    title: "URL"
                                  },
                                  {
                                    value: "storedFile",
                                    icon: "DatabaseOutlined",
                                    title: "Stored File"
                                  }
                                ],
                              })
                              .addSettingsInputRow({
                                id: "backgroundStyleRow-color",
                                parentId: "backgroundStylePnl",
                                inputs: [{
                                  type: 'colorPicker',
                                  id: nanoid(),
                                  label: "Color",
                                  propertyName: "background.color",
                                  hideLabel: true,
                                  jsSetting: false,
                                }],
                                hidden: { _code: 'return  getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.background?.type) !== "color";', _mode: 'code', _value: false } as any,
                              })
                              .addSettingsInputRow({
                                id: "backgroundStyle-gradientColors",
                                parentId: "backgroundStylePnl",
                                inputs: [{
                                  type: 'multiColorPicker',
                                  id: 'backgroundStyle-gradientColors',
                                  propertyName: "background.gradient.colors",
                                  label: "Colors",
                                  jsSetting: false,
                                }
                                ],
                                hidden: { _code: 'return  getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.background?.type) !== "gradient";', _mode: 'code', _value: false } as any,
                                hideLabel: true,
                              })
                              .addSettingsInputRow({
                                id: "backgroundStyle-url",
                                parentId: "backgroundStylePnl",
                                inputs: [{
                                  type: 'textField',
                                  id: nanoid(),
                                  propertyName: "background.url",
                                  jsSetting: false,
                                  label: "URL",
                                }],
                                hidden: { _code: 'return  getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.background?.type) !== "url";', _mode: 'code', _value: false } as any,
                              })
                              .addSettingsInputRow({
                                id: "backgroundStyle-image",
                                parentId: 'backgroundStylePnl',
                                inputs: [{
                                  type: 'imageUploader',
                                  id: 'backgroundStyle-image',
                                  propertyName: 'background.uploadFile',
                                  label: "Image",
                                  jsSetting: false,
                                }],
                                hidden: { _code: 'return  getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.background?.type) !== "image";', _mode: 'code', _value: false } as any,
                              })
                              .addSettingsInputRow({
                                id: "backgroundStyleRow-storedFile",
                                parentId: 'backgroundStylePnl',
                                hidden: { _code: 'return  getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.background?.type) !== "storedFile";', _mode: 'code', _value: false } as any,
                                inputs: [
                                  {
                                    type: 'textField',
                                    id: 'backgroundStyle-storedFile',
                                    jsSetting: false,
                                    propertyName: "background.storedFile.id",
                                    label: "File ID"
                                  }
                                ]
                              })
                              .addSettingsInputRow({
                                id: "backgroundStyleRow-controls",
                                parentId: 'backgroundStyleRow',
                                inline: true,
                                hidden: { _code: 'return  getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.background?.type) === "color";', _mode: 'code', _value: false } as any,
                                inputs: [
                                  {
                                    type: 'customDropdown',
                                    id: 'backgroundStyleRow-size',
                                    label: "Size",
                                    hideLabel: true,
                                    propertyName: "background.size",
                                    customTooltip: 'Size of the background image, two space separated values with units e.g "100% 100px"',
                                    dropdownOptions: sizeOptions,
                                  },
                                  {
                                    type: 'customDropdown',
                                    id: 'backgroundStyleRow-position',
                                    label: "Position",
                                    hideLabel: true,
                                    customTooltip: 'Position of the background image, two space separated values with units e.g "5em 100px"',
                                    propertyName: "background.position",
                                    dropdownOptions: positionOptions,
                                  }
                                ]
                              })
                              .addSettingsInputRow({
                                id: 'backgroundStyleRow-repeat',
                                parentId: 'backgroundStyleRow',
                                inputs: [{
                                  type: 'radio',
                                  id: 'backgroundStyleRow-repeat-radio',
                                  label: 'Repeat',
                                  hideLabel: true,
                                  propertyName: 'background.repeat',
                                  inputType: 'radio',
                                  buttonGroupOptions: repeatOptions,
                                }],
                                hidden: { _code: 'return  getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.background?.type) === "color";', _mode: 'code', _value: false } as any,
                              })
                              .toJson()
                          ],
                        }
                      })
                      .addCollapsiblePanel({
                        id: nanoid(),
                        propertyName: 'pnlShadowStyle',
                        label: 'Shadow',
                        labelAlign: 'right',
                        ghost: true,
                        parentId: styleRouterId,
                        collapsible: 'header',
                        content: {
                          id: shadowStylePnlId,
                          components: [...new DesignerToolbarSettings()
                            .addSettingsInputRow({
                              id: nanoid(),
                              parentId: shadowStylePnlId,
                              inline: true,
                              inputs: [
                                {
                                  type: 'numberField',
                                  id: nanoid(),
                                  label: 'Offset X',
                                  hideLabel: true,
                                  width: 80,
                                  icon: "offsetHorizontalIcon",
                                  propertyName: 'shadow.offsetX',
                                  tooltip: 'OffsetX. The larger the value, the bigger the shadow',
                                },
                                {
                                  type: 'numberField',
                                  id: nanoid(),
                                  label: 'Offset Y',
                                  hideLabel: true,
                                  width: 80,
                                  icon: 'offsetVerticalIcon',
                                  propertyName: 'shadow.offsetY',
                                  description: 'OffsetY. The larger the value, the bigger the shadow',
                                },
                                {
                                  type: 'numberField',
                                  id: nanoid(),
                                  label: 'Blur',
                                  hideLabel: true,
                                  width: 80,
                                  icon: 'blurIcon',
                                  propertyName: 'shadow.blurRadius',
                                  description: 'Blur. The larger the value, the bigger the blur',
                                },
                                {
                                  type: 'numberField',
                                  id: nanoid(),
                                  label: 'Spread',
                                  hideLabel: true,
                                  width: 80,
                                  icon: 'spreadIcon',
                                  propertyName: 'shadow.spreadRadius',
                                  description: 'Spread. The larger the value, the bigger the spread',
                                },
                                {
                                  type: 'colorPicker',
                                  id: nanoid(),
                                  label: 'Color',
                                  hideLabel: true,
                                  propertyName: 'shadow.color',
                                },
                              ],
                            })
                            .toJson()
                          ]
                        }
                      })
                      .addCollapsiblePanel({
                        id: nanoid(),
                        propertyName: 'stylingBox',
                        label: 'Margin & Padding',
                        labelAlign: 'right',
                        ghost: true,
                        collapsible: 'header',
                        content: {
                          id: nanoid(),
                          components: [...new DesignerToolbarSettings()
                            .addStyleBox({
                              id: nanoid(),
                              label: 'Margin Padding',
                              hideLabel: true,
                              propertyName: 'stylingBox',
                            })
                            .toJson()
                          ]
                        }
                      })
                      .addCollapsiblePanel({
                        id: nanoid(),
                        propertyName: 'style',
                        label: 'Custom Styles',
                        labelAlign: 'right',
                        ghost: true,
                        parentId: styleRouterId,
                        collapsible: 'header',
                        content: {
                          id: nanoid(),
                          components: [...new DesignerToolbarSettings()
                            .addSettingsInput({
                              id: nanoid(),
                              inputType: 'codeEditor',
                              propertyName: 'style',
                              label: 'Style',
                              description: 'A script that returns the style of the element as an object. This should conform to CSSProperties',
                            })
                            .toJson()
                          ]
                        }
                      })
                      .toJson(),
                  ]
                })
                .toJson()
            ]
          },
          {
            key: 'security',
            title: 'Security',
            id: securityId,
            components: [...new DesignerToolbarSettings()
              .addSettingsInput({
                id: nanoid(),
                inputType: 'permissions',
                propertyName: 'permissions',
                label: 'Permissions',
                size: 'small',
                parentId: securityId,
                jsSetting: true,
              })
              .toJson()
            ]
          }
        ]
      })
      .toJson(),
    formSettings: {
      colon: false,
      layout: 'vertical' as FormLayout,
      labelCol: { span: 24 },
      wrapperCol: { span: 24 }
    }
  };
};