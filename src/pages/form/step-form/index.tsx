import React, { useRef, useState } from 'react';
import type { FormInstance } from 'antd';
import { Card, Result, Button, Descriptions, Divider, Alert, Statistic } from 'antd';
import { PageContainer } from '@ant-design/pro-layout';
import ProForm, { ProFormDigit, ProFormSelect, ProFormText, StepsForm } from '@ant-design/pro-form';
import type { StepDataType } from './data.d';
import styles from './style.less';

const StepDescriptions: React.FC<{
  stepData: StepDataType;
  bordered?: boolean;
}> = ({ stepData, bordered }) => {
  const { payAccount, receiverAccount, receiverName, amount } = stepData;
  return (
    <Descriptions column={1} bordered={bordered}>
<Descriptions.Item label="Payment Account"> {payAccount}</Descriptions.Item>
       <Descriptions.Item label="Receiving Account"> {receiverAccount}</Descriptions.Item>
       <Descriptions.Item label="Payee name"> {receiverName}</Descriptions.Item>
       <Descriptions.Item label="Transfer amount">
        <Statistic
          value={amount}
          suffix={
            <span
              style={{
                fontSize: 14,
              }}
            >
              $
            </span>
          }
          precision={2}
        />
      </Descriptions.Item>
    </Descriptions>
  );
};

const StepResult: React.FC<{
  onFinish: () => Promise<void>;
}> = (props) => {
  return (
    <Result
      status="success"
      title="操作成功"
      subTitle="预计两小时内到账"
      extra={
        <>
          <Button type="primary" onClick={props.onFinish}>
            再转一笔
          </Button>
          <Button>查看账单</Button>
        </>
      }
      className={styles.result}
    >
      {props.children}
    </Result>
  );
};

const StepForm: React.FC<Record<string, any>> = () => {
  const [stepData, setStepData] = useState<StepDataType>({
    payAccount: 'ant-design@alipay.com',
    receiverAccount: 'test@example.com',
    receiverName: 'Alex',
    amount: '500',
    receiverMode: 'alipay',
  });
  const [current, setCurrent] = useState(0);
  const formRef = useRef<FormInstance>();

  return (
    <PageContainer content="Divide a lengthy or unfamiliar form task into multiple steps to guide users through.">
      <Card bordered={false}>
        <StepsForm
          current={current}
          onCurrentChange={setCurrent}
          submitter={{
            render: (props, dom) => {
              if (props.step === 2) {
                return null;
              }
              return dom;
            },
          }}
        >
          <StepsForm.StepForm<StepDataType>
            formRef={formRef}
            title="Fill in the transfer information"
            initialValues={stepData}
            onFinish={async (values) => {
              setStepData(values);
              return true;
            }}
          >
            <ProFormSelect
              label="Payment Account"
              width="md"
              name="payAccount"
              rules={[{ required: true, message: '请选择Payment Account' }]}
              valueEnum={{
                'ant-design@alipay.com': 'ant-design@alipay.com',
              }}
            />

           <ProForm.Group title="Receiving Account" size={8}>
              <ProFormSelect
                name="receiverMode"
                rules={[{ required: true, message:'Please select Payment Account' }]}
                valueEnum={{
                  alipay:'Alipay',
                  bank:'Bank account',
                }}
              />
              <ProFormText
                name="receiverAccount"
                rules={[
                  {required: true, message:'Please enter the payee account' },
                  {type:'email', message:'Account name should be in email format' },
                ]}
                placeholder="test@example.com"
              />
            </ProForm.Group>
            <ProFormText
              label="Payee Name"
              width="md"
              name="receiverName"
              rules={[{ required: true, message:'Please enter the payee name' }]}
              placeholder="Please enter the payee name"
            />
            <ProFormDigit
              label="Transfer amount"
              name="amount"
              width="md"
              rules={[
                {required: true, message:'Please enter the transfer amount' },
                {
                  pattern: /^(\d+)((?:\.\d+)?)$/,
                  message:'Please enter a legal amount number',
                },
              ]}
              placeholder="Please enter the amount"
              fieldProps={{
                prefix:'￥',
              }}
            />
          </StepsForm.StepForm>

         <StepsForm.StepForm title="Confirm transfer information">
            <div className={styles.result}>
              <Alert
                closable
                showIcon
                message="After confirming the transfer, the funds will be directly credited to the other party's account and cannot be returned."
                style={{ marginBottom: 24 }}
              />
              <StepDescriptions stepData={stepData} bordered />
              <Divider style={{ margin: '24px 0'}} />
              <ProFormText.Password
                label="Payment password"
                width="md"
                name="password"
                required={false}
                rules={[{ required: true, message:'A password is required to make a payment' }]}
              />
            </div>
          </StepsForm.StepForm>
          <StepsForm.StepForm title="Finish">
            <StepResult
              onFinish={async () => {
                setCurrent(0);
                formRef.current?.resetFields();
              }}
            >
              <StepDescriptions stepData={stepData} />
            </StepResult>
          </StepsForm.StepForm>
        </StepsForm>
        <Divider style={{ margin: '40px 0 24px' }} />
        <div className={styles.desc}>
          <h3>Description</h3>
          <h4>Transfer to Alipay account</h4>
          <p>
            If necessary, some common questions about the product can be put here. If necessary, some common questions about the product can be put here. If necessary, some common questions about the product can be put here.
          </p>
          <h4>Transfer to bank card</h4>
          <p>
            If necessary, some common questions about the product can be put here. If necessary, some common questions about the product can be put here. If necessary, some common questions about the product can be put here.
          </p>
        </div>
      </Card>
    </PageContainer>
  );
};

export default StepForm;
