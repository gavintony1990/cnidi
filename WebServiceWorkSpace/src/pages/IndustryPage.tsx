import React from "react";
import {
  Button,
  Card,
  Col,
  Row,
  Space,
  Statistic,
  Tag,
  Typography,
} from "antd";
import {
  ApiOutlined,
  AuditOutlined,
  BankOutlined,
  BulbOutlined,
  ClusterOutlined,
  RocketOutlined,
  SolutionOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import AppLayout from "../components/AppLayout";

const { Title, Text, Paragraph } = Typography;

const SERVICES = [
  {
    icon: <ClusterOutlined />,
    color: "#1677ff",
    title: "产业链分析",
    desc: "深度梳理行业上下游结构，提供产业链图谱和关键环节竞争力分析报告，助企业精准定位。",
    tags: ["制造业", "科技行业"],
  },
  {
    icon: <ApiOutlined />,
    color: "#52c41a",
    title: "供应链优化",
    desc: "基于数据驱动的供应链诊断与优化方案，从采购、仓储到配送全链路降本增效。",
    tags: ["物流", "采购"],
  },
  {
    icon: <AuditOutlined />,
    color: "#722ed1",
    title: "政策咨询与申报",
    desc: "全面覆盖国家及地方产业政策，专业团队辅助企业完成专项资金、高新认定等申报工作。",
    tags: ["政策", "补贴申报"],
  },
  {
    icon: <BankOutlined />,
    color: "#fa8c16",
    title: "产业金融对接",
    desc: "整合银行、VC/PE 及政策性基金资源，为不同发展阶段企业提供定制化融资匹配服务。",
    tags: ["融资", "投融资"],
  },
  {
    icon: <BulbOutlined />,
    color: "#eb2f96",
    title: "技术转化与成果对接",
    desc: "链接高校院所与企业，推动科技成果从实验室到产业化，加速技术转让与联合研发。",
    tags: ["研发", "技术转让"],
  },
  {
    icon: <RocketOutlined />,
    color: "#13c2c2",
    title: "企业数字化诊断",
    desc: "专业顾问团队上门或线上诊断企业数字化现状，输出差距分析与实施路线图。",
    tags: ["数字化", "咨询"],
  },
  {
    icon: <SolutionOutlined />,
    color: "#f5222d",
    title: "人才引进与招聘对接",
    desc: "依托产业人才库，精准匹配技术骨干与管理人才，支持猎头、校招及海外引才。",
    tags: ["人才", "HR"],
  },
  {
    icon: <ThunderboltOutlined />,
    color: "#389e0d",
    title: "园区与选址服务",
    desc: "覆盖全国重点产业园区资源，提供选址评估、政策对比和入驻谈判全程支持。",
    tags: ["园区", "选址"],
  },
];

const STATS = [
  { title: "服务企业", value: 1200, suffix: "+" },
  { title: "合作园区", value: 86, suffix: "+" },
  { title: "政策库覆盖", value: 3000, suffix: "+" },
  { title: "专家顾问", value: 200, suffix: "+" },
];

export default function IndustryPage() {
  return (
    <AppLayout>
      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(135deg, #001d66 0%, #003eb3 100%)",
          padding: "64px 40px",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <Title level={1} style={{ color: "#fff", margin: 0, fontSize: 38 }}>
          产业服务
        </Title>
        <Paragraph style={{ color: "rgba(255,255,255,0.8)", fontSize: 18, margin: "16px 0 0" }}>
          整合政府、金融、技术与人才资源，为产业升级提供全周期专业支撑
        </Paragraph>
      </div>

      {/* 数据统计 */}
      <div style={{ background: "#fff", borderBottom: "1px solid #f0f0f0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>
          <Row gutter={[0, 0]} justify="space-around">
            {STATS.map((s) => (
              <Col key={s.title} xs={12} sm={6} style={{ textAlign: "center" }}>
                <Statistic
                  title={<Text type="secondary">{s.title}</Text>}
                  value={s.value}
                  suffix={s.suffix}
                  valueStyle={{ color: "#1677ff", fontWeight: 700 }}
                />
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* 服务列表 */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 24px" }}>
        <Space direction="vertical" size={4} style={{ marginBottom: 36 }}>
          <Title level={2} style={{ margin: 0 }}>我们的服务</Title>
          <Text type="secondary">涵盖产业发展全链路，一站式解决企业核心诉求</Text>
        </Space>

        <Row gutter={[24, 24]}>
          {SERVICES.map((svc) => (
            <Col xs={24} sm={12} lg={6} key={svc.title}>
              <Card
                hoverable
                style={{ height: "100%", borderTop: `3px solid ${svc.color}` }}
                actions={[
                  <Button key="consult" type="link" style={{ color: svc.color }}>
                    咨询服务
                  </Button>,
                ]}
              >
                <Space direction="vertical" size={12} style={{ width: "100%" }}>
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: `${svc.color}18`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      color: svc.color,
                    }}
                  >
                    {svc.icon}
                  </div>
                  <Title level={5} style={{ margin: 0 }}>
                    {svc.title}
                  </Title>
                  <Text type="secondary" style={{ fontSize: 13, lineHeight: 1.6 }}>
                    {svc.desc}
                  </Text>
                  <Space wrap>
                    {svc.tags.map((t) => (
                      <Tag key={t} color={svc.color} style={{ fontSize: 12 }}>
                        {t}
                      </Tag>
                    ))}
                  </Space>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>

        {/* CTA */}
        <div
          style={{
            marginTop: 64,
            background: "linear-gradient(135deg, #e6f4ff 0%, #f0f5ff 100%)",
            borderRadius: 16,
            padding: "48px 40px",
            textAlign: "center",
          }}
        >
          <Title level={3} style={{ margin: 0 }}>有定制化需求？</Title>
          <Paragraph type="secondary" style={{ fontSize: 16, margin: "12px 0 24px" }}>
            我们的产业顾问团队将为您制定专属解决方案
          </Paragraph>
          <Button type="primary" size="large" icon={<SolutionOutlined />}>
            预约顾问咨询
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
