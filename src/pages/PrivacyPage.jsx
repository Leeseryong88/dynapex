import { useLanguage } from '../context/LanguageContext'
import { usePageMeta } from '../hooks/usePageMeta'
import styles from './PrivacyPage.module.css'

const accent = 'rgb(0,255,204)'

export default function PrivacyPage() {
  const { lang } = useLanguage()

  usePageMeta(
    '개인정보처리방침 — DYNAPEX',
    'Privacy Policy — DYNAPEX',
    'DYNAPEX 개인정보처리방침: 개인정보 수집, 이용, 보관 및 보호에 관한 방침',
    'DYNAPEX Privacy Policy: information about data collection, usage, storage, and protection.'
  )

  // Content data
  const content = {
    kr: {
      title: '개인정보처리방침',
      lastUpdated: '최종 수정일: 2024년 1월',
      sections: [
        {
          id: 'collection',
          title: '1. 개인정보의 수집 및 이용 목적',
          content: [
            '주식회사 다이나펙스(이하 "회사")는 다음의 목적을 위해 개인정보를 수집 및 이용합니다:',
            '• 서비스 제공 및 계약 이행',
            '• 고객 문의 및 상담 응답',
            '• 제품 데모 신청 및 영업 활동',
            '• 이메일, 우편을 통한 마케팅 정보 제공 (사용자 동의 시)',
            '• 법적 의무 이행 및 분쟁 해결',
            '• 서비스 개선 및 통계 분석',
          ],
        },
        {
          id: 'collection-items',
          title: '2. 수집하는 개인정보의 항목',
          content: [
            '회사는 다음의 개인정보를 수집합니다:',
            '필수 항목: 이름, 이메일 주소, 전화번호, 회사명, 직책',
            '선택 항목: 주소, 기타 문의 사항',
            '자동 수집: 접속 로그, 쿠키, 방문 기록 (서비스 개선 목적)',
          ],
        },
        {
          id: 'retention',
          title: '3. 개인정보의 보유 및 이용 기간',
          content: [
            '수집한 개인정보는 다음 기간 동안 보유 및 이용합니다:',
            '• 서비스 계약 기간: 계약 종료 시까지',
            '• 마케팅 정보: 거부 시까지',
            '• 법적 의무: 관련 법률 규정에 따른 기간',
            '• 기타: 목적 달성 후 지체없이 파기',
          ],
        },
        {
          id: 'destruction',
          title: '4. 개인정보의 파기 절차 및 방법',
          content: [
            '회사는 개인정보 이용 목적이 달성되면 해당 정보를 다음과 같이 파기합니다:',
            '파기 절차: 종이 문서는 분쇄하고, 전자 문서는 복원 불가능한 방식으로 삭제',
            '법적 보관 의무가 있는 경우 법정 기간 동안 안전하게 보관',
          ],
        },
        {
          id: 'third-party',
          title: '5. 개인정보의 제3자 제공',
          content: [
            '회사는 다음의 경우를 제외하고 개인정보를 제3자에게 제공하지 않습니다:',
            '• 사용자의 명시적 동의가 있을 때',
            '• 법률에서 요구하거나 허용하는 경우',
            '• 서비스 제공을 위해 필수적으로 필요한 경우',
          ],
        },
        {
          id: 'outsourcing',
          title: '6. 개인정보처리의 위탁',
          content: [
            '회사는 서비스 제공을 위해 다음과 같이 개인정보 처리를 위탁할 수 있습니다:',
            '• 이메일 서비스 제공자: 고객 커뮤니케이션',
            '• 클라우드 호스팅 제공자: 데이터 저장 및 관리',
            '• 분석 서비스 제공자: 웹사이트 트래픽 분석',
            '모든 수탁자는 개인정보 보호 계약을 체결하고 엄격한 보안 기준을 준수합니다.',
          ],
        },
        {
          id: 'rights',
          title: '7. 정보주체의 권리·의무',
          content: [
            '귀하는 다음의 권리를 행사할 수 있습니다:',
            '• 개인정보 열람: 회사가 보유한 귀하의 개인정보를 열람할 권리',
            '• 수정 요청: 부정확하거나 불완전한 정보의 수정을 요청할 권리',
            '• 삭제 요청: 더 이상 필요 없는 개인정보의 삭제를 요청할 권리',
            '• 처리 정지 요청: 개인정보 처리의 중단을 요청할 권리',
            '• 데이터 이동권: 개인정보를 구조화된 형식으로 수신할 권리',
            '이러한 권리 행사는 연락처를 통해 요청하실 수 있습니다.',
          ],
        },
        {
          id: 'officer',
          title: '8. 개인정보 보호책임자',
          content: [
            '회사의 개인정보 보호책임자는 다음과 같습니다:',
          ],
          contact: true,
        },
        {
          id: 'security',
          title: '9. 개인정보 보안 및 암호화',
          content: [
            '회사는 개인정보를 안전하게 보호하기 위해 다음과 같은 조치를 취합니다:',
            '• SSL/TLS 암호화를 통한 전송 보안',
            '• 접근 제어 및 인증 시스템',
            '• 정기적인 보안 감시 및 모니터링',
            '• 직원 보안 교육 및 계약 의무',
            '• 개인정보 침해 시 신속한 통지 및 조치',
          ],
        },
        {
          id: 'consent',
          title: '10. 마케팅 정보 수신 동의',
          content: [
            '회사는 마케팅 정보 제공을 위해 사용자의 명시적 동의를 구합니다.',
            '마케팅 정보 수신을 거부하시려면 언제든지 연락처를 통해 요청하실 수 있습니다.',
            '회사는 거부 의사에 따라 즉시 전송을 중단합니다.',
          ],
        },
        {
          id: 'amendment',
          title: '11. 정책 변경',
          content: [
            '회사는 필요에 따라 본 개인정보처리방침을 변경할 수 있습니다.',
            '변경 시 웹사이트를 통해 공지하거나 이메일로 통보합니다.',
            '중대한 변경사항의 경우 30일 전 사전 공지합니다.',
          ],
        },
      ],
    },
    en: {
      title: 'Privacy Policy',
      lastUpdated: 'Last Updated: January 2024',
      sections: [
        {
          id: 'collection',
          title: '1. Collection and Use of Personal Information',
          content: [
            'DYNAPEX Inc. (hereinafter "Company") collects and uses personal information for the following purposes:',
            '• Providing services and fulfilling contracts',
            '• Responding to customer inquiries and consultations',
            '• Processing product demo requests and business development',
            '• Providing marketing information via email or mail (with user consent)',
            '• Fulfilling legal obligations and resolving disputes',
            '• Service improvement and statistical analysis',
          ],
        },
        {
          id: 'collection-items',
          title: '2. Types of Personal Information Collected',
          content: [
            'The Company collects the following personal information:',
            'Required: Name, email address, phone number, company name, job title',
            'Optional: Address, additional inquiry details',
            'Automatically collected: Access logs, cookies, visit records (for service improvement)',
          ],
        },
        {
          id: 'retention',
          title: '3. Retention and Use Period of Personal Information',
          content: [
            'Collected personal information is retained and used for the following periods:',
            '• Service contract period: Until contract termination',
            '• Marketing information: Until objection',
            '• Legal obligations: As required by applicable laws',
            '• Other purposes: Destroyed without delay after purpose fulfillment',
          ],
        },
        {
          id: 'destruction',
          title: '4. Destruction Procedures and Methods',
          content: [
            'The Company destroys personal information when its purpose is fulfilled as follows:',
            'Procedure: Paper documents are shredded; electronic documents are deleted in an irreversible manner',
            'Information with legal retention requirements is securely preserved for the required period',
          ],
        },
        {
          id: 'third-party',
          title: '5. Third-Party Disclosure of Personal Information',
          content: [
            'The Company does not disclose personal information to third parties except in the following cases:',
            '• When user has provided explicit consent',
            '• When required or permitted by law',
            '• When necessary for service provision',
          ],
        },
        {
          id: 'outsourcing',
          title: '6. Outsourcing of Personal Information Processing',
          content: [
            'The Company may outsource personal information processing for service provision as follows:',
            '• Email service providers: Customer communication',
            '• Cloud hosting providers: Data storage and management',
            '• Analytics service providers: Website traffic analysis',
            'All processors are bound by personal information protection agreements and adhere to strict security standards.',
          ],
        },
        {
          id: 'rights',
          title: '7. Rights and Obligations of Data Subjects',
          content: [
            'You have the right to exercise the following:',
            '• Right to access: You may request to access your personal information held by the Company',
            '• Right to rectification: You may request correction of inaccurate or incomplete information',
            '• Right to erasure: You may request deletion of unnecessary personal information',
            '• Right to restrict processing: You may request suspension of personal information processing',
            '• Data portability: You may receive your personal information in a structured format',
            'These rights can be exercised by contacting us at the provided contact information.',
          ],
        },
        {
          id: 'officer',
          title: '8. Personal Information Protection Officer',
          content: [
            'The Company\'s Personal Information Protection Officer is as follows:',
          ],
          contact: true,
        },
        {
          id: 'security',
          title: '9. Personal Information Security and Encryption',
          content: [
            'The Company implements the following measures to protect personal information:',
            '• Transmission security through SSL/TLS encryption',
            '• Access control and authentication systems',
            '• Regular security monitoring and surveillance',
            '• Employee security training and contractual obligations',
            '• Prompt notification and response to personal information breaches',
          ],
        },
        {
          id: 'consent',
          title: '10. Marketing Information Consent',
          content: [
            'The Company seeks explicit user consent before providing marketing information.',
            'You can request to opt out of marketing information at any time by contacting us.',
            'The Company will immediately cease transmission upon receipt of your objection.',
          ],
        },
        {
          id: 'amendment',
          title: '11. Policy Changes',
          content: [
            'The Company may modify this Privacy Policy as necessary.',
            'Changes will be announced through the website or notified via email.',
            'Significant changes will be notified at least 30 days in advance.',
          ],
        },
      ],
    },
  }

  const t = content[lang]

  return (
    <div className={styles.page}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1>{t.title}</h1>
        <p>{t.lastUpdated}</p>
      </section>

      {/* Content Section */}
      <section className={styles.content}>
        <div className={styles.container}>
          {t.sections.map((section) => (
            <div key={section.id} className={styles.section}>
              <h2 className={styles.sectionTitle}>{section.title}</h2>

              {section.content.map((line, idx) => (
                <p key={idx} className={styles.sectionText}>
                  {line}
                </p>
              ))}

              {section.contact && (
                <div className={styles.contactBox}>
                  <p style={{ margin: '8px 0', fontSize: '0.95rem' }}>
                    <strong>{lang === 'kr' ? '회사명' : 'Company'}:</strong> {lang === 'kr' ? '주식회사 다이나펙스' : 'DYNAPEX Inc.'}
                  </p>
                  <p style={{ margin: '8px 0', fontSize: '0.95rem' }}>
                    <strong>{lang === 'kr' ? '주소' : 'Address'}:</strong> {lang === 'kr' ? '서울시 금천구 서부샛길 606, A동 2007호' : 'A 2007, 606, Seobusaet-gil, Geumcheon-gu, Seoul, Korea'}
                  </p>
                  <p style={{ margin: '8px 0', fontSize: '0.95rem' }}>
                    <strong>{lang === 'kr' ? '이메일' : 'Email'}:</strong>{' '}
                    <a href="mailto:contact@dynapex.co" style={{ color: accent, textDecoration: 'none' }}>
                      contact@dynapex.co
                    </a>
                  </p>
                  <p style={{ margin: '8px 0', fontSize: '0.95rem' }}>
                    <strong>{lang === 'kr' ? '전화' : 'Phone'}:</strong> 82-02-861-9158
                  </p>
                </div>
              )}
            </div>
          ))}

          {/* Final Note */}
          <div className={styles.section}>
            <p className={styles.sectionText} style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              {lang === 'kr'
                ? '본 개인정보처리방침은 2024년 1월 1일부터 적용됩니다. 문의 사항이 있으시면 위의 연락처를 통해 문의하여 주시기 바랍니다.'
                : 'This Privacy Policy became effective on January 1, 2024. For any inquiries, please contact us using the contact information provided above.'}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
