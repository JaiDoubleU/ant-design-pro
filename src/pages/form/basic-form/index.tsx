import { Card, message } from 'antd';
import ProForm, {
  ProFormDateRangePicker,
  ProFormDependency,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { useRequest } from 'umi';
import type { FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { fakeSubmitForm } from './service';
import styles from './style.less';

const BasicForm: FC<Record<string, any>> = () => {
  const { run } = useRequest(fakeSubmitForm, {
    manual: true,
    onSuccess: () => {
      message.success('提交成功');
    },
  });

  const onFinish = async (values: Record<string, any>) => {
    run(values);
  };

  return (
    <PageContainer content="The form page is used to collect or verify information from the user. The basic form is often used in a form scenario with few data items.">
      <Card bordered={false}>
        <ProForm
          hideRequiredMark
          style={{ margin: 'auto', marginTop: 8, maxWidth: 600 }}
          name="basic"
          layout="vertical"
          initialValues={{ public: '1' }}
          onFinish={onFinish}
        >
          <ProFormText
            width="md"
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: 'Please enter a title',
              },
            ]}
            placeholder="Give the target a name"
          />
          <ProFormDateRangePicker
            label="Start and End Day Period"
            width="md"
            name="date"
            rules={[
              {
                required: true,
                message: 'Please select the start and end Day period',
              },
            ]}
            placeholder={['Start Day period','End Day period']}
          />
          <ProFormTextArea
            label="Target Description"
            width="xl"
            name="goal"
          rules={[
               {
                 required: true,
                 message:'Please enter a description of the target',
               },
             ]}
             placeholder="Please enter your phased work goals"
          />

          <ProFormTextArea
            label="Metric"
             name="standard"
             width="xl"
             rules={[
               {
                 required: true,
                 message:'Please enter the measurement standard',
               },
             ]}
             placeholder="Please enter the measurement standard"
          />

       <ProFormText
            width="md"
            label={
              <span>
                Customer
                <em className={styles.optional}>(optional)</em>
              </span>
            }
            tooltip="Service object of the target"
            name="client"
            placeholder="Please describe the customers of your Service, internal customers directly @Name/work number"
          />

          <ProFormText
            width="md"
            label={
              <span>
                Invited Commenter
                <em className={styles.optional}>(optional)</em>
              </span>
            }
            name="invites"
            placeholder="Please directly @名/工号, up to 5 people can be invited"
          />

          <ProFormDigit
            label={
              <span>
                Weights
                <em className={styles.optional}>(optional)</em>
              </span>
            }
            name="weight"
            placeholder="Please Enter"
            min={0}
            max={100}
            width="xs"
            fieldProps={{
              formatter: (value) => `${value || 0}%`,
              parser: (value) => (value? value.replace('%',''): '0'),
            }}
          />

          <ProFormRadio.Group
            options={[
              {
                value: '1',
                label:'Public',
              },
              {
                value: '2',
                label:'Partially public',
              },
              {
                value: '3',
                label:'Unlisted',
              },
            ]}
            label="Target Public"
            help="Clients and reviewers are shared by default"
            name="publicType"
          />
          <ProFormDependency name={['publicType']}>
            {({ publicType }) => {
              return (
                <ProFormSelect
                  width="md"
                  name="publicUsers"
                  fieldProps={{
                    style: {
                      margin: '8px 0',
                      display: publicType && publicType === '2' ? 'block' : 'none',
                    },
                  }}
                  options={[
                    {
                      value: '1',
                      label: '同事甲',
                    },
                    {
                      value: '2',
                      label: '同事乙',
                    },
                    {
                      value: '3',
                      label: '同事丙',
                    },
                  ]}
                />
              );
            }}
          </ProFormDependency>
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default BasicForm;
