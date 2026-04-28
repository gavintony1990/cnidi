import React from "react";
import {
  Button,
  Card,
  Col,
  Divider,
  Row,
  Space,
  Timeline,
  Typography,
} from "antd";
import {
  AimOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  HeartOutlined,
  MailOutlined,
  PhoneOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import AppLayout from "../components/AppLayout";

const { Title, Text, Paragraph } = Typography;

const MILESTONES = [
  { year: "2019", content: "天工联项目正式立项，聚焦产业数字化升级需求" },
  { year: "2020", content: "首批产业培训课程上线，服务企业突破 100 家" },
  { year: "2021", content: "完成 A 轮融资，产业服务体系全面扩展" },
  { year: "2022", content: "与 30+ 产业园区达成深度合作，覆盖华东、华南核心产业带" },
  { year: "2023", content: "数字化平台上线，实现线上线下一体化服务闭环" },
  { year: "2024", content: "累计服务企业超 1200 家，培训学员超 50000 人" },
  { year: "2025", content: "启动国际化战略，开拓东南亚产业合作网络" },
];

const VALUES = [
  {
    icon: <AimOutlined />,
    color: "#1677ff",
    title: "使命",
    content: "连接产业链上下游资源，降低企业发展成本，加速产业现代化进程。",
  },
  {
    icon: <GlobalOutlined />,
    color: "#52c41a",
    title: "愿景",
    content: "成为中国最具影响力的产业赋能平台，推动制造业向高端化、智能化升级。",
  },
  {
    icon: <HeartOutlined />,
    color: "#eb2f96",
    title: "价值观",
    content: "专业、诚信、共赢。我们相信优质的产业生态需要每一个参与者共同建设。",
  },
];

const TEAM = [
  { name: "张建国", role: "创始人 & CEO", desc: "前工信部产业政策顾问，20 年制造业从业经验" },
  { name: "李晓敏", role: "联合创始人 & CTO", desc: "工业互联网专家，曾主导多个大型数字化转型项目" },
  { name: "王磊", role: "产业服务总监", desc: "供应链优化专家，服务百余家头部制造企业" },
  { name: "陈婷", role: "培训学院院长", desc: "人力资源专家，打造天工联产业人才培养体系" },
];

export default function AboutPage() {
  return (
    <AppLayout>
      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(135deg, #141414 0%, #1d1d1d 100%)",
          padding: "64px 40px",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <Title level={1} style={{ color: "#fff", margin: 0, fontSize: 38 }}>
          关于我们
        </Title>
        <Paragraph style={{ color: "rgba(255,255,255,0.7)", fontSize: 18, margin: "16px 0 0" }}>
          天工联 · 专注产业赋能 · 致力于连接产业、人才与资本
        </Paragraph>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>

        {/* 公司简介 */}
        <Row gutter={[48, 32]} align="middle" style={{ marginBottom: 64 }}>
          <Col xs={24} md={12}>
            <Space direction="vertical" size={16}>
              <Title level={2} style={{ margin: 0 }}>我们是谁</Title>
              <Paragraph style={{ fontSize: 16, lineHeight: 1.8, color: "#444" }}>
                天工联是一家专注于产业赋能的综合服务平台，致力于为制造业、科技企业和服务机构搭建高效的资源对接通道。
              </Paragraph>
              <Paragraph style={{ fontSize: 16, lineHeight: 1.8, color: "#444" }}>
                我们整合政策资源、金融资本、技术力量与产业人才，通过专业培训、产业服务和数字化工具，帮助企业在快速变化的市场中实现可持续增长。
              </Paragraph>
              <Space>
                <EnvironmentOutlined style={{ color: "#1677ff" }} />
                <Text type="secondary">总部位于上海，业务覆盖全国 20+ 省市</Text>
              </Space>
            </Space>
          </Col>
          <Col xs={24} md={12}>
            <Row gutter={[16, 16]}>
              {[
                { num: "6 年", label: "深耕产业赋能" },
                { num: "1200+", label: "服务企业" },
                { num: "50000+", label: "培训学员" },
                { num: "200+", label: "专家顾问" },
              ].map((item) => (
                <Col span={12} key={item.label}>
                  <Card style={{ textAlign: "center", background: "#f5f7fa", border: "none" }}>
                    <Title level={2} style={{ color: "#1677ff", margin: 0 }}>
                      {item.num}
                    </Title>
                    <Text type="secondary">{item.label}</Text>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>

        <Divider />

        {/* 使命愿景价值观 */}
        <div style={{ margin: "48px 0" }}>
          <Title level={2} style={{ marginBottom: 32 }}>使命 · 愿景 · 价值观</Title>
          <Row gutter={[24, 24]}>
            {VALUES.map((v) => (
              <Col xs={24} md={8} key={v.title}>
                <Card style={{ height: "100%", borderTop: `3px solid ${v.color}` }}>
                  <Space direction="vertical" size={12}>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: `${v.color}15`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 22,
                        color: v.color,
                      }}
                    >
                      {v.icon}
                    </div>
                    <Title level={4} style={{ margin: 0, color: v.color }}>
                      {v.title}
                    </Title>
                    <Paragraph style={{ lineHeight: 1.7, margin: 0, color: "#555" }}>
                      {v.content}
                    </Paragraph>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        <Divider />

        {/* 发展历程 */}
        <div style={{ margin: "48px 0" }}>
          <Title level={2} style={{ marginBottom: 32 }}>发展历程</Title>
          <Timeline
            mode="alternate"
            items={MILESTONES.map((m) => ({
              label: <Text strong style={{ color: "#1677ff", fontSize: 15 }}>{m.year}</Text>,
              children: (
                <Card size="small" style={{ display: "inline-block", maxWidth: 300 }}>
                  <Text>{m.content}</Text>
                </Card>
              ),
            }))}
          />
        </div>

        <Divider />

        {/* 核心团队 */}
        <div style={{ margin: "48px 0" }}>
          <Title level={2} style={{ marginBottom: 32 }}>核心团队</Title>
          <Row gutter={[24, 24]}>
            {TEAM.map((member) => (
              <Col xs={24} sm={12} lg={6} key={member.name}>
                <Card hoverable style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #1677ff 0%, #0050b3 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 28,
                      color: "#fff",
                      margin: "0 auto 16px",
                    }}
                  >
                    <TeamOutlined />
                  </div>
                  <Title level={5} style={{ margin: 0 }}>{member.name}</Title>
                  <Text type="secondary" style={{ fontSize: 13 }}>{member.role}</Text>
                  <Paragraph style={{ marginTop: 8, fontSize: 13, color: "#666", lineHeight: 1.5 }}>
                    {member.desc}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        <Divider />

        {/* 联系我们 */}
        <div style={{ margin: "48px 0" }}>
          <Title level={2} style={{ marginBottom: 32 }}>联系我们</Title>
          <Row gutter={[24, 24]}>
            <Col xs={24} md={8}>
              <Card>
                <Space direction="vertical" size={12}>
                  <div style={{ fontSize: 24, color: "#1677ff" }}><PhoneOutlined /></div>
                  <Title level={5} style={{ margin: 0 }}>电话咨询</Title>
                  <Text>400-888-0000</Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>工作日 09:00 – 18:00</Text>
                </Space>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card>
                <Space direction="vertical" size={12}>
                  <div style={{ fontSize: 24, color: "#52c41a" }}><MailOutlined /></div>
                  <Title level={5} style={{ margin: 0 }}>邮件联系</Title>
                  <Text>contact@cnidi.com</Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>24 小时内回复</Text>
                </Space>
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card>
                <Space direction="vertical" size={12}>
                  <div style={{ fontSize: 24, color: "#722ed1" }}><EnvironmentOutlined /></div>
                  <Title level={5} style={{ margin: 0 }}>公司地址</Title>
                  <Text>上海市浦东新区张江高科技园区</Text>
                  <Text type="secondary" style={{ fontSize: 12 }}>科苑路 88 号天工联大厦</Text>
                </Space>
              </Card>
            </Col>
          </Row>
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Button type="primary" size="large" icon={<MailOutlined />}>
              发送合作意向
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
