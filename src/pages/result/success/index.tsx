import { DingdingOutlined } from '@ant-design/icons';
import { Button, Card, Steps, Result, Descriptions } from 'antd';
import { Fragment } from 'react';
import { GridContent } from '@ant-design/pro-layout';

import styles from './index.less';

const { Step } = Steps;

const desc1 = (
  <div className={styles.title}>
    <div style={{ margin: '8px 0 4px' }}>
      <span>曲丽丽</span>
      <DingdingOutlined style={{ marginLeft: 8, color: '#00A0E9' }} />
    </div>
    <div>2016-12-12 12:32</div>
  </div>
);

const desc2 = (
  <div style={{ fontSize: 12 }} className={styles.title}>
    <div style={{ margin: '8px 0 4px' }}>
      <span>周毛毛</span>
      <a href="">
        <DingdingOutlined style={{ color: '#00A0E9', marginLeft: 8 }} />
        <span>催一下</span>
      </a>
    </div>
  </div>
);

const content = (
  <>
    <Descriptions title="Project Name">
      <Descriptions.Item label="项目 ID">23421</Descriptions.Item>
      <Descriptions.Item label="负责人">曲丽丽</Descriptions.Item>
      <Descriptions.Item label="生效时间">2016-12-12 ~ 2017-12-12</Descriptions.Item>
    </Descriptions>
    <br />
    <Steps progressDot current={1}>
      <Step title={<span style={{ fontSize: 14 }}>创建项目</span>} description={desc1} />
      <Step title={<span style={{ fontSize: 14 }}>部门初审</span>} description={desc2} />
      <Step title={<span style={{ fontSize: 14 }}>财务复核</span>} />
      <Step title={<span style={{ fontSize: 14 }}>Finish</span>} />
    </Steps>
  </>
);

const extra = (
  <Fragment>
    <Button type="primary">返回列表</Button>
    <Button>查看项目</Button>
    <Button>打印</Button>
  </Fragment>
);

export default () => (
  <GridContent>
    <Card bordered={false}>
      <Result
        status="success"
        title="提交成功"
        subTitle="The submission result page is used to feed back the processing results of a series of operation tasks. If it is only a simple operation, use the Message global prompt to give feedback. This text area can display simple supplementary instructions. If there is a similar need to display documents, the following gray area can present more complex content."
        extra={extra}
        style={{ marginBottom: 16 }}
      >
        {content}
      </Result>
    </Card>
  </GridContent>
);
