import React, { useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Modal,
  Row,
  Space,
  Tag,
  Typography,
  message,
} from "antd";
import {
  BookOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  PlayCircleOutlined,
  TrophyOutlined,
  UserOutlined,
} from "@ant-design/icons";
import AppLayout from "../components/AppLayout";

const { Title, Text, Paragraph } = Typography;

const TRAINING_COURSES = [
  {
    id: 1,
    title: "智能制造与工业 4.0 实战培训",
    desc: "系统学习智能制造核心技术，掌握工业互联网、数字孪生和自动化生产实践。",
    date: "2026-05-15",
    duration: "3 天",
    seats: 30,
    remaining: 8,
    level: "进阶",
    color: "#1677ff",
    icon: <TrophyOutlined />,
  },
  {
    id: 2,
    title: "供应链数字化转型专题",
    desc: "覆盖供应链全链路数字化方案，结合真实企业案例，带你从理论到落地。",
    date: "2026-05-22",
    duration: "2 天",
    seats: 40,
    remaining: 15,
    level: "中级",
    color: "#52c41a",
    icon: <CalendarOutlined />,
  },
  {
    id: 3,
    title: "产业政策解读与申报实务",
    desc: "深度解析最新产业扶持政策，手把手教你完成项目申报材料撰写与流程对接。",
    date: "2026-06-05",
    duration: "1 天",
    seats: 60,
    remaining: 42,
    level: "基础",
    color: "#722ed1",
    icon: <BookOutlined />,
  },
];

const FREE_COURSES = [
  {
    id: 1,
    title: "碳中和与绿色制造入门",
    desc: "15 分钟带你了解碳中和目标下制造业的转型方向与机遇。",
    duration: "15 分钟",
    views: "2.4k",
    tag: "环保",
    tagColor: "green",
  },
  {
    id: 2,
    title: "工业互联网平台选型指南",
    desc: "横向对比主流工业互联网平台，助你快速找到适合企业的解决方案。",
    duration: "28 分钟",
    views: "5.1k",
    tag: "技术",
    tagColor: "blue",
  },
  {
    id: 3,
    title: "中小制造业融资渠道全解析",
    desc: "系统梳理银行贷款、股权融资、政府补贴等多种融资路径与申请技巧。",
    duration: "22 分钟",
    views: "3.8k",
    tag: "金融",
    tagColor: "gold",
  },
  {
    id: 4,
    title: "精益生产：消除七大浪费",
    desc: "经典精益理念结合国内制造实践，帮助生产管理者快速提升现场效率。",
    duration: "35 分钟",
    views: "6.2k",
    tag: "管理",
    tagColor: "purple",
  },
];

export default function HomePage() {
  const [registerModal, setRegisterModal] = useState<(typeof TRAINING_COURSES)[0] | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleRegister = async () => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 800));
    setSubmitting(false);
    setRegisterModal(null);
    message.success("报名成功！课程信息将发送至您的账号，请注意查收。");
  };

  return (
    <AppLayout>
      {/* Hero Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, #1677ff 0%, #0050b3 100%)",
          padding: "64px 40px",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <Title level={1} style={{ color: "#fff", margin: 0, fontSize: 40 }}>
          赋能产业 · 连接未来
        </Title>
        <Paragraph style={{ color: "rgba(255,255,255,0.85)", fontSize: 18, margin: "16px 0 32px" }}>
          天工联为制造业、科技企业和服务机构提供专业培训与产业资源对接
        </Paragraph>
        <Space size={16}>
          <Button type="primary" size="large" ghost onClick={() => document.getElementById("training")?.scrollIntoView({ behavior: "smooth" })}>
            查看培训课程
          </Button>
          <Button size="large" style={{ background: "transparent", color: "#fff", borderColor: "rgba(255,255,255,0.5)" }} onClick={() => document.getElementById("free")?.scrollIntoView({ behavior: "smooth" })}>
            免费公开课
          </Button>
        </Space>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>

        {/* 培训报名 */}
        <div id="training" style={{ marginBottom: 64 }}>
          <Space direction="vertical" size={4} style={{ marginBottom: 32 }}>
            <Title level={2} style={{ margin: 0 }}>用户培训报名</Title>
            <Text type="secondary">精选产业升级专题培训，限额招募，名额有限请尽早报名</Text>
          </Space>
          <Row gutter={[24, 24]}>
            {TRAINING_COURSES.map((course) => (
              <Col xs={24} md={8} key={course.id}>
                <Card
                  hoverable
                  style={{ height: "100%", borderTop: `3px solid ${course.color}` }}
                  actions={[
                    <Button
                      key="register"
                      type="primary"
                      block
                      style={{ margin: "0 16px", width: "calc(100% - 32px)", background: course.color, borderColor: course.color }}
                      onClick={() => setRegisterModal(course)}
                    >
                      立即报名
                    </Button>,
                  ]}
                >
                  <Space direction="vertical" size={12} style={{ width: "100%" }}>
                    <Space>
                      <span style={{ fontSize: 24, color: course.color }}>{course.icon}</span>
                      <Tag color={course.color}>{course.level}</Tag>
                    </Space>
                    <Title level={4} style={{ margin: 0 }}>{course.title}</Title>
                    <Text type="secondary" style={{ lineHeight: 1.6 }}>{course.desc}</Text>
                    <Space direction="vertical" size={4}>
                      <Space>
                        <CalendarOutlined style={{ color: "#888" }} />
                        <Text type="secondary">{course.date} 开课</Text>
                      </Space>
                      <Space>
                        <ClockCircleOutlined style={{ color: "#888" }} />
                        <Text type="secondary">课程时长：{course.duration}</Text>
                      </Space>
                      <Space>
                        <UserOutlined style={{ color: "#888" }} />
                        <Text type="secondary">
                          总名额 {course.seats} 人 ·{" "}
                          <Text style={{ color: course.remaining <= 10 ? "#ff4d4f" : "#52c41a" }}>
                            剩余 {course.remaining} 席
                          </Text>
                        </Text>
                      </Space>
                    </Space>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* 免费课程 */}
        <div id="free">
          <Space direction="vertical" size={4} style={{ marginBottom: 32 }}>
            <Title level={2} style={{ margin: 0 }}>免费课程</Title>
            <Text type="secondary">精心筛选的公开课内容，随时学习，完全免费</Text>
          </Space>
          <Row gutter={[24, 24]}>
            {FREE_COURSES.map((course) => (
              <Col xs={24} sm={12} lg={6} key={course.id}>
                <Card
                  hoverable
                  style={{ height: "100%" }}
                  cover={
                    <div
                      style={{
                        height: 120,
                        background: "linear-gradient(135deg, #e6f4ff 0%, #bae0ff 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 40,
                        color: "#1677ff",
                      }}
                    >
                      <PlayCircleOutlined />
                    </div>
                  }
                  actions={[
                    <Button key="watch" type="link" icon={<PlayCircleOutlined />}>
                      立即观看
                    </Button>,
                  ]}
                >
                  <Space direction="vertical" size={8} style={{ width: "100%" }}>
                    <Tag color={course.tagColor}>{course.tag}</Tag>
                    <Text strong style={{ fontSize: 15, display: "block", lineHeight: 1.4 }}>
                      {course.title}
                    </Text>
                    <Text type="secondary" style={{ fontSize: 13, lineHeight: 1.5 }}>
                      {course.desc}
                    </Text>
                    <Space style={{ color: "#aaa", fontSize: 13 }}>
                      <ClockCircleOutlined />
                      <span>{course.duration}</span>
                      <span>·</span>
                      <UserOutlined />
                      <span>{course.views} 人已学</span>
                    </Space>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* 报名弹窗 */}
      <Modal
        open={!!registerModal}
        title={`报名确认：${registerModal?.title}`}
        onCancel={() => setRegisterModal(null)}
        footer={[
          <Button key="cancel" onClick={() => setRegisterModal(null)}>取消</Button>,
          <Button key="confirm" type="primary" loading={submitting} onClick={handleRegister}>
            确认报名
          </Button>,
        ]}
      >
        {registerModal && (
          <Space direction="vertical" size={12} style={{ width: "100%", padding: "8px 0" }}>
            <Space>
              <CalendarOutlined />
              <Text>开课时间：{registerModal.date}</Text>
            </Space>
            <Space>
              <ClockCircleOutlined />
              <Text>课程时长：{registerModal.duration}</Text>
            </Space>
            <Space>
              <UserOutlined />
              <Text>剩余名额：{registerModal.remaining} 席</Text>
            </Space>
            <Text type="secondary" style={{ lineHeight: 1.6 }}>
              报名成功后，课程详情及地址将发送至您的账号，请确保账号信息完整。
            </Text>
          </Space>
        )}
      </Modal>
    </AppLayout>
  );
}
