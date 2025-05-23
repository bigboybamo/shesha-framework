import classNames from 'classnames';
import ConfigurableComponent from '../appConfigurator/configurableComponent';
import EditViewMsg from '../appConfigurator/editViewMsg';
import React, { FC, MutableRefObject, useEffect } from 'react';
import { IConfigurableFormProps, SheshaFormProps } from './models';
import { Form, FormInstance } from 'antd';
import { useAppConfigurator, useShaRouting, useSheshaApplication } from '@/providers';
import { useFormDesignerUrl } from '@/providers/form/hooks';
import { FormWithFlatMarkup } from './formWithFlatMarkup';
import { useShaForm } from '@/providers/form/store/shaFormInstance';
import { MarkupLoadingError } from './markupLoadingError';
import { ConfigurableFormInstance, ConfigurableItemIdentifierToString } from '@/interfaces';
import { ShaFormProvider } from '@/providers/form/providers/shaFormProvider';
import { IShaFormInstance } from '@/providers/form/store/interfaces';
import ParentProvider from '@/providers/parentProvider';
import { ShaSpin } from '..';

export type ConfigurableFormProps<Values = any> = Omit<IConfigurableFormProps<Values>, 'form' | 'formRef' | 'shaForm'> & {
  form?: FormInstance<any>;
  formRef?: MutableRefObject<Partial<ConfigurableFormInstance> | null>;
  // TODO: merge with formRef
  shaFormRef?: MutableRefObject<IShaFormInstance>;
  isSettingsForm?: boolean;
} & SheshaFormProps;

export const ConfigurableForm: FC<ConfigurableFormProps> = (props) => {
  const {
    formId,
    markup,
    cacheKey,
    isSettingsForm = false,
    onFinish,
    initialValues,
    parentFormValues,
    onSubmitted,
    onValuesChange,
    onMarkupLoaded,
    formArguments,
    markupLoadingError,
    showFormInfoOverlay = true,
    showDataLoadingIndicator = true,
    showMarkupLoadingIndicator = true,
    shaFormRef,
    mode = 'readonly',
    actions,
    sections,
  } = props;
  const { switchApplicationMode, configurationItemMode } = useAppConfigurator();
  const app = useSheshaApplication();

  const [form] = Form.useForm(props.form);
  const [shaForm] = useShaForm({
    form: undefined,
    antdForm: form,
    init: (instance) => {
      instance.setFormMode(props.mode);
      instance.setParentFormValues(parentFormValues);
    }
  });
  shaForm.setOnMarkupLoaded(onMarkupLoaded);

  if (shaFormRef)
    shaFormRef.current = shaForm;

  //#region shaForm sync
  useEffect(() => {
    shaForm.setLogEnabled(Boolean(props.logEnabled));
  }, [shaForm, props.logEnabled]);

  useEffect(() => {
    if (formId) {
      shaForm.initByFormId({ 
        formId: formId, 
        configurationItemMode: configurationItemMode, 
        formArguments: formArguments,
        initialValues: initialValues,
      });
    }
  }, [shaForm, formId, configurationItemMode, formArguments]);
  useEffect(() => {
    if (markup) {
      shaForm.initByRawMarkup({
        rawMarkup: markup,
        formArguments: formArguments,
        initialValues: initialValues,
        cacheKey: cacheKey,
        isSettingsForm: isSettingsForm,
      });
    }
  }, [shaForm, markup, formArguments, initialValues, isSettingsForm, cacheKey]);

  useEffect(() => {
    shaForm.setFormMode(mode);
  }, [shaForm, mode]);

  useEffect(() => {
    shaForm.setSubmitHandler(onFinish);
  }, [shaForm, onFinish]);

  useEffect(() => {
    shaForm.setOnValuesChange(onValuesChange);
  }, [shaForm, onValuesChange]);


  useEffect(() => {
    shaForm.setAfterSubmitHandler(onSubmitted);
  }, [shaForm, onSubmitted]);
  //#endregion shaForm sync

  const canConfigure = Boolean(app.routes.formsDesigner) && Boolean(formId);
  const { router } = useShaRouting(false) ?? {};

  const formDesignerUrl = useFormDesignerUrl(formId);

  const openInDesigner = () => {
    if (formDesignerUrl && router) {
      router.push(formDesignerUrl);
      switchApplicationMode('live');
    }
  };

  const { markupLoadingState, dataLoadingState } = shaForm;
  const MarkupErrorRender = markupLoadingError ?? MarkupLoadingError;

  return (
    <ShaSpin
      spinning={showMarkupLoadingIndicator && markupLoadingState.status === 'loading' || showDataLoadingIndicator && dataLoadingState.status === 'loading'}
      tip={dataLoadingState.hint}
      spinIconSize={40}
    >
      <ConfigurableComponent canConfigure={canConfigure} onStartEdit={openInDesigner}>
        {(componentState, BlockOverlay) => (
          <div className={classNames(componentState.wrapperClassName, props?.className)}>
            <BlockOverlay>
              <EditViewMsg persistedFormProps={showFormInfoOverlay ? shaForm.form : undefined} />
            </BlockOverlay>
            <ShaFormProvider shaForm={shaForm}>
              <ParentProvider model={null} formMode={shaForm.formMode} formFlatMarkup={shaForm.flatStructure} formApi={shaForm.getPublicFormApi()} 
                name={ConfigurableItemIdentifierToString(formId)} isScope
              >
                {markupLoadingState.status === 'ready' && (
                  <FormWithFlatMarkup
                    {...props}
                    form={form}
                    initialValues={shaForm.initialValues}
                    formFlatMarkup={shaForm.flatStructure}
                    formSettings={shaForm.settings}
                    persistedFormProps={shaForm.form}
                    onMarkupUpdated={() => {
                      shaForm.reloadMarkup();
                    }}
                    shaForm={shaForm}
                    actions={actions}
                    sections={sections}
                  />
                )}
                {markupLoadingState.status === 'failed' && (
                  <MarkupErrorRender formId={formId} markupLoadingState={markupLoadingState} />
                )}
                {markupLoadingState.status === 'loading' && (
                  <></>
                )}
              </ParentProvider>
            </ShaFormProvider>
          </div>
        )}
      </ConfigurableComponent>
    </ShaSpin>
  );
};