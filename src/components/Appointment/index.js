import { SearchOutlined, SyncOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { Badge, Breadcrumb, Button, Calendar, Card, Col, Form, Input, Row } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './index.module.less';

const Appointment = props => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState('none');
  const getListData = value => {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          { type: 'warning', content: 'Tư vấn online.' },
          { type: 'success', content: 'Khám bệnh.' },
        ];
        break;
      case 10:
        listData = [
          { type: 'warning', content: 'Tiêm vắc xin.' },
          { type: 'success', content: 'Kiểm tra triệu chứng.' },
          { type: 'error', content: 'Tư vấn' },
        ];
        break;
      case 15:
        listData = [
          { type: 'warning', content: 'Kiểm tra sau tiêm 2 tuần' },
          { type: 'success', content: 'Khám tổng quát' },
          { type: 'error', content: 'Kiểm tra kháng thể' },
        ];
        break;
      default:
    }
    return listData || [];
  };

  const dateCellRender = value => {
    const events = getListData(value);
    // return (
    //   <ul className="events">
    //     {listData.map(item => (
    //       <li key={item.content}>
    //         <Badge status={item.type} text={item.content} />
    //       </li>
    //     ))}
    //   </ul>
    // );
    const isToday =
      value.format('DD/MM/YYYY') === new Date(Date.now()).toLocaleString('en-GB').split(',')[0];
    return (
      <div className={!isToday ? styles.date : styles['date-today']}>
        <div className={styles['date-title']}>{value.format('D')}</div>
        <div className={styles.events}>
          <div>
            <ul className={styles['list-event']}>
              {events.map(item => (
                <li key={item.content}>
                  <Badge status={item.type} text={item.content} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  };

  const getMonthData = value => {
    if (value.month() === 8) {
      return 1394;
    }
  };

  const monthCellRender = value => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };
  const handleReset = () => {
    form.resetFields();
    setVisible('none');
  };
  const handleSubmit = () => {
    setVisible('block');
  };
  return (
    <div>
      <div className={styles.banner}>
        <div style={{ marginTop: '60px' }} className="container">
          <Row gutter={[20, 0]}>
            <Col xs={24} md={14} lg={12} xl={12}>
              <h3 className="title">Lịch khám chữa bệnh</h3>
              <p>
                Tra cứu lịch khám chữa bệnh trong mùa dịch. Hoạt động được tổ chức bởi mạng lưới bác
                sĩ và tình nguyện viên trong những vùng có nguy cơ cao mắc Covid-19 tại cộng đồng.
              </p>
            </Col>
          </Row>
        </div>
      </div>
      <div style={{ marginTop: '-40px' }} className="container">
        <Card className={styles.card}>
          <Form layout="vertical" form={form} onFinish={handleSubmit}>
            <Row gutter={[20, 0]} justify="center">
              <Col sm={24} xs={24} md={12}>
                <Form.Item
                  label="CMND/CCCD/HC"
                  name="idNumber"
                  onKeyPress={event => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  rules={[{ required: true, message: 'Vui lòng nhập CMND/CCCD/HC!' }]}>
                  <Input placeholder="CMND/CCCD/HC" />
                </Form.Item>
              </Col>
              <Col sm={24} xs={24} md={12}>
                <Form.Item
                  onKeyPress={event => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  label="Số điện thoại"
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: 'Số điện thoại không được bỏ trống',
                    },
                    { min: 10, message: 'Vui lòng nhập số điện thoại đúng định dạng' },
                  ]}>
                  <Input placeholder="Số điện thoại" />
                </Form.Item>
              </Col>
              <Col sm={12} xs={12} md={6} lg={6}>
                <Button
                  className={styles.btn}
                  onClick={handleReset}
                  size="large"
                  type="primary"
                  block
                  ghost
                  icon={<SyncOutlined />}>
                  Nhập lại
                </Button>
              </Col>
              <Col sm={12} xs={12} md={6} lg={6}>
                <Button
                  className={styles.btn}
                  size="large"
                  block
                  type="primary"
                  htmlType="submit"
                  icon={<SearchOutlined />}>
                  Tra cứu
                </Button>
              </Col>
            </Row>
            <div style={{ textAlign: 'center', margin: '1rem 0' }}>
              <Link to={'/appointment/register'}>
                <Button className={styles.btn} type="link" ghost icon={<WhatsAppOutlined />}>
                  Đặt lịch khám
                </Button>
              </Link>
            </div>
          </Form>
        </Card>
        <Card style={{ display: visible, marginTop: '20px' }}>
          <Calendar dateFullCellRender={dateCellRender} monthCellRender={monthCellRender} />
        </Card>
      </div>
    </div>
  );
};

export default Appointment;
