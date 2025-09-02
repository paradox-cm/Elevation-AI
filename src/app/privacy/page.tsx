"use client"

import React from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { DisplaySmall, H3, BodyLarge, BodySmall, P } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import Link from "next/link"
import { Logo } from "@/components/ui/logo"

export default function PrivacyPolicyPage() {
  return (
    <PageWrapper>
      <div className="min-h-screen bg-background transition-colors duration-300">
        {/* Header */}
        <header className="border-b border-border/50 bg-background/40 backdrop-blur-2xl">
          <div className="w-full px-4 sm:px-4 md:px-6 lg:px-8 flex h-14 sm:h-18 items-center justify-between">
            <div className="flex items-center">
              <Link href="/wireframes/home" className="hover:opacity-80 transition-opacity">
                <Logo width={110} height={20} />
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" asChild className="text-xs xl:text-sm hover:bg-muted/50">
                <Link href="/wireframes/login">
                  <Icon name="login-box-line" className="h-4 w-4 mr-1" />
                  Login
                </Link>
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1">
          <Section paddingY="xl">
            <Container>
              <div className="max-w-4xl mx-auto">
                {/* Page Header */}
                <div className="text-center space-y-6 mb-12">
                  <DisplaySmall className="font-bold">
                    Privacy Policy
                  </DisplaySmall>
                  <BodySmall className="text-muted-foreground">
                    Last updated: January 2025
                  </BodySmall>
                </div>

                {/* Content */}
                <div className="space-y-8">
                  {/* Introduction */}
                  <Card className="border-border/50">
                    <CardHeader>
                      <H3>Introduction</H3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <P>
                        Elevation AI, Inc. ("we", "us" or the "Company"), respect your privacy and are committed to protecting it through compliance with this Privacy Policy.
                      </P>
                      <P>
                        This Privacy Policy describes and governs the manner in which we collect, use, maintain and disclose information about you when you use our website at www.elevationai.com, related mobile applications, and other online services (the "Services"). Please read this Privacy Policy carefully before you start to use the Services. By accessing and/or using the Services, you accept and agree to be bound and abide by this Privacy Policy and our Terms of Use available at Terms of Use (the "Terms of Use") incorporated herein by reference and to comply with all applicable laws, rules and regulations (collectively, "Applicable Law"). If you do not want to agree to this Privacy Policy and the Terms of Use, you must not access or use the Services.
                      </P>
                    </CardContent>
                  </Card>

                  {/* Personal Information */}
                  <Card className="border-border/50">
                    <CardHeader>
                      <H3>Personal Information</H3>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <P>
                        We may collect personal information from you in a variety of ways, including the following key categories and types of personal information:
                      </P>
                      
                      <div>
                        <H3 className="font-semibold mb-3">Contact Information</H3>
                        <P className="text-muted-foreground">
                          Name, username, address, email address and phone number, name and email address of spouse, if applicable, and name, the jurisdiction of incorporation or formation, address, and phone number of your business.
                        </P>
                      </div>

                      <div>
                        <H3 className="font-semibold mb-3">Bank Information</H3>
                        <P className="text-muted-foreground">
                          Bank and automated clearing house (ACH) information, including account number and routing number and bank name, address, and payment reference, for your business.
                        </P>
                      </div>

                      <div>
                        <H3 className="font-semibold mb-3">Professional or Employment-Related Information</H3>
                        <P className="text-muted-foreground">
                          Professional and employment information shared by you, including your position and employer and educational experience.
                        </P>
                      </div>

                      <div>
                        <H3 className="font-semibold mb-3">Business Information</H3>
                        <P className="text-muted-foreground">
                          Information about your business, including the type of industry, products, and services sold, customer reviews, online profile, financial, sales, and marketing data and metrics, owners and authorized employees, and certain financing and other needs as requested through our Services.
                        </P>
                      </div>

                      <div>
                        <H3 className="font-semibold mb-3">Application Information</H3>
                        <P className="text-muted-foreground">
                          You may use the Services to apply for certain financing services and may be required to submit certain information about yourself and your business. We will collect the information that you provide us as part of your application process.
                        </P>
                      </div>

                      <div>
                        <H3 className="font-semibold mb-3">Personal Information</H3>
                        <P className="text-muted-foreground">
                          We will collect your social security number and the tax ID of your company or business. We also may ask for a driver's license, passport, and other forms of identification and may derive and collect personal information from such forms of identification.
                        </P>
                      </div>

                      <div>
                        <H3 className="font-semibold mb-3">Information About Your Transaction</H3>
                        <P className="text-muted-foreground">
                          We will collect information about any transaction for which you use the Services, including information about your financing needs and services.
                        </P>
                      </div>

                      <div>
                        <H3 className="font-semibold mb-3">Geolocation Data</H3>
                        <P className="text-muted-foreground">
                          The general region or area from which you access our Services.
                        </P>
                      </div>

                      <div>
                        <H3 className="font-semibold mb-3">Internet or Other Online Activity</H3>
                        <P className="text-muted-foreground">
                          Referral channels that led you to our Services, browsing and click history, and information about how you navigate our Services.
                        </P>
                      </div>

                      <div>
                        <H3 className="font-semibold mb-3">Inferences</H3>
                        <P className="text-muted-foreground">
                          We may make inferences based on the information we collect.
                        </P>
                      </div>

                      <div>
                        <H3 className="font-semibold mb-3">Information from Public Sources</H3>
                        <P className="text-muted-foreground">
                          We may obtain information about you and your business on the internet or through offline sources and other public or commercial sources.
                        </P>
                      </div>
                    </CardContent>
                  </Card>

                  {/* How We Use Collected Information */}
                  <Card className="border-border/50">
                    <CardHeader>
                      <H3>How We Use Collected Information</H3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <P>
                        We may collect and use your personal information for the following purposes:
                      </P>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• <strong>To provide and improve customer service.</strong> We use your contact information to answer your questions and respond to your requests and inquiries, notify you of changes to the Services, and maintain and improve the functionality of our Services.</li>
                        <li>• <strong>To provide the Services.</strong> We use personal information to provide you with the Services.</li>
                        <li>• <strong>For financing services.</strong> We share your personal information with financing providers (the "Financing Providers") for funding services that you request and apply through the Services. The Financing Providers may use your personal information to conduct underwriting on your application, monitor the status of their funding, and ensure compliance with and enforce the terms of their funding agreements with you.</li>
                        <li>• <strong>For analytical purposes.</strong> We use your internet activity, browsing history, and geolocation data to analyze preferences, trends, and statistics. We may also use your activity on our Services in an anonymized and aggregate way in order to improve our Services. We may also use your information to protect the Company, our Services, and our website, and to prevent fraud, theft, and misconduct.</li>
                        <li>• <strong>For relevant updates, marketing, and promotional purposes.</strong> We use your contact information, employment-related information, other personal information, and various inferences described above to send you relevant articles, blog posts, newsletters, podcasts, and other information we think may be relevant to you. We may also use information about your use of our Services in an anonymized and aggregated way to analyze trends and statistics and to promote and market our Services.</li>
                        <li>• <strong>To comply with the law.</strong> We use your personal information to enforce and comply with the law, including to conduct an investigation, to protect the property and rights belonging to us or a third party, to protect the safety of the public or any person, or to prevent or stop activity we may consider to be or to pose a risk of being, illegal, fraudulent, unethical or legally actionable activity.</li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* How We Collect Your Personal Information */}
                  <Card className="border-border/50">
                    <CardHeader>
                      <H3>How We Collect Your Personal Information</H3>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <P>
                        We collect personal information from the following sources:
                      </P>
                      
                      <div>
                        <H3 className="font-semibold mb-3">Directly</H3>
                        <P className="text-muted-foreground">
                          We collect personal information directly from you. When you register for the Services, submit information in an online form, apply for financing services, request information from us, or otherwise communicate with us or our support personnel, you may provide us with information, for example, your name, email address, phone number, and physical address. By providing us with this information, you consent to your information being collected, used, disclosed, processed, and stored by us in accordance with this Privacy Policy.
                        </P>
                      </div>

                      <div>
                        <H3 className="font-semibold mb-3">API and Account Integration</H3>
                        <P className="text-muted-foreground">
                          We collect personal information by connecting or integrating with third-party providers and services, including Google Workspace APIs and other platforms with which you have accounts. For example, through integration with Google Workspace APIs, we may access certain data to facilitate our Services. Similarly, through integrations with platforms like Amazon.com, we may collect sales, advertising, marketing, and other information about you and your business, as permitted by the terms of those platforms.
                        </P>
                      </div>

                      <div>
                        <H3 className="font-semibold mb-3">Passively</H3>
                        <P className="text-muted-foreground">
                          We and our service providers collect personal information from you passively from the internet and other automatic data collection tools, such as cookies and web beacons, which are summarized below:
                        </P>
                        <ul className="space-y-2 text-muted-foreground mt-2">
                          <li>• <strong>Cookies (or browser cookies).</strong> A cookie is a small file placed on the hard drive of your computer. You may refuse to accept browser Cookies by activating the appropriate setting on your browser. However, if you select this setting you may be unable to access certain parts of our website. Unless you have adjusted your browser setting so that it will refuse cookies, our system will issue cookies when you direct your browser to our website.</li>
                          <li>• <strong>Web Beacons.</strong> Pages of our website may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that permit the Company, for example, to count users who have visited those pages or/and for other related website statistics (for example, recording the popularity of certain website content and verifying system and server integrity).</li>
                        </ul>
                      </div>

                      <div>
                        <H3 className="font-semibold mb-3">Tracking Tools</H3>
                        <P className="text-muted-foreground">
                          We use the following tracking tools:
                        </P>
                        <ul className="space-y-2 text-muted-foreground mt-2">
                          <li>• <strong>Google Analytics and Adwords:</strong> We use Google tools such as Google Analytics and Google Adwords to understand how users use our website. This includes looking at where a visitor comes from and where they go when they leave our site. Google Analytics provides an opt-out for its tool here.</li>
                          <li>• <strong>Other tracking tools:</strong> We may deploy other automatic tracking tools in the future. Similar to the tools we currently use, such future tracking tools will track data about our visitors only in the aggregate and on an anonymized basis and will not reveal personal information about you.</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  {/* When We Share Your Personal Information */}
                  <Card className="border-border/50">
                    <CardHeader>
                      <H3>When We Share Your Personal Information with Third Parties</H3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• <strong>With service providers who do things on our behalf.</strong> For example, we will share information with vendors and contractors who conduct email marketing for us or who assist us with developing and providing Services and customer support. Such service providers may reside outside the United States and in countries that may not provide the same level of protection as the laws of the United States.</li>
                        <li>• <strong>With Financing Providers.</strong> We share your personal information with Financing Providers who may use your personal information as disclosed above.</li>
                        <li>• <strong>With third parties as directed by you or to support transactions you engage in via the Services.</strong> We may share your information with third parties with your consent or as requested by you, or in connection with a transaction you engage in through the Services.</li>
                        <li>• <strong>In accordance with applicable law.</strong> We may share your information with the appropriate authorities if we believe disclosure is in accordance with or required by, any applicable law, including lawful requests by public authorities to meet national security or law enforcement requirements.</li>
                        <li>• <strong>In connection with the sale of the Company.</strong> In the event of a reorganization, merger, or sale we may transfer your personal information we collect to the relevant third party.</li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* We Do Not Sell Your Personal Information */}
                  <Card className="border-border/50">
                    <CardHeader>
                      <H3>We Do Not Sell Your Personal Information</H3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <P>
                        We do not sell, trade, or rent your personal information to others.
                      </P>
                    </CardContent>
                  </Card>

                  {/* We Do Not Train AI Using Your Personal Information */}
                  <Card className="border-border/50">
                    <CardHeader>
                      <H3>We Do Not Train AI Using Your Personal Information</H3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <P>
                        We do not use any data accessed via Google Workspace APIs to develop, improve, or train generalized artificial intelligence (AI) or machine learning (ML) models.
                      </P>
                    </CardContent>
                  </Card>

                  {/* Third-Party Links and Websites */}
                  <Card className="border-border/50">
                    <CardHeader>
                      <H3>Third-Party Links and Websites</H3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <P>
                        Our Services may contain advertising, links, or other content from the websites and services of our partners, suppliers, advertisers, sponsors, licensors, and other third parties (collectively, the "Third-Party Services"). We do not control the content or links that appear on these Third-Party Services and are not responsible for the practices employed by such Third-Party Services. In addition, these Third-Party Services may have their own privacy policies and customer service policies. Browsing and interacting on any of these Third-Party Services are subject to such Third-Party Services' own terms and policies.
                      </P>
                    </CardContent>
                  </Card>

                  {/* Your Choices */}
                  <Card className="border-border/50">
                    <CardHeader>
                      <H3>Your Choices</H3>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <P>
                        You have certain choices on how we treat your personal information, described below:
                      </P>
                      
                      <div>
                        <H3 className="font-semibold mb-3">Modifications to Personal Information</H3>
                        <P className="text-muted-foreground">
                          You may review and request modifications to your personal information by editing your profile directly on our website or by contacting us at operations@elevationai.com. Please note that we will retain data for as long as it is reasonably necessary to fulfill the purpose for which it has been collected or as required or permitted by applicable law. If you provide us with updated information, we will do our best to keep your information accurate and up-to-date. We will make good-faith efforts to make requested changes in any active database as soon as practicable.
                        </P>
                      </div>

                      <div>
                        <H3 className="font-semibold mb-3">Marketing Communications</H3>
                        <P className="text-muted-foreground">
                          You can opt out of promotional marketing communications by unsubscribing through the Services or contacting us at operations@elevationai.com. We may give choices about other emails and communications you receive from us. If you opt-out, we may still send you non-promotional communications, such as those about your account or our ongoing business.
                        </P>
                      </div>

                      <div>
                        <H3 className="font-semibold mb-3">Ad Choices</H3>
                        <P className="text-muted-foreground">
                          Some advertisements and other content may be delivered by third-party advertising networks and advertisers that may use cookies and similar and/or your advertiser ID for mobile devices to collect and track information such as demographic information, inferred interests, aggregated information, and activity to assist them in delivering advertising that is more relevant to your interests. To find out more about third-party advertising networks and similar entities that use these technologies, see www.aboutads.info. If you would like to opt-out of such ad networks and services' advertising practices, you may find a service provider (for example, www.aboutads.info/choices) to opt out in desktop and mobile web browsers.
                        </P>
                      </div>

                      <div>
                        <H3 className="font-semibold mb-3">Tracking Technology</H3>
                        <P className="text-muted-foreground">
                          You may turn off part or all of our tracking software that has been placed on your computer by following the instructions on your browser. On a mobile device, you may turn off part or all of mobile tracking through your mobile device settings. However, if you prevent the use of tracking software or tracking through your mobile device, it will be more difficult and may be impossible, for you to use the Service or portions of the Services.
                        </P>
                      </div>

                      <div>
                        <H3 className="font-semibold mb-3">Cookies</H3>
                        <P className="text-muted-foreground">
                          Most web browsers are set by default to accept cookies. You can usually set your browser to remove or reject cookies. Please note if you choose to reject, this could affect the availability and functionality of our Services.
                        </P>
                      </div>

                      <div>
                        <H3 className="font-semibold mb-3">Not Providing Personal Information</H3>
                        <P className="text-muted-foreground">
                          You may choose not to provide personal information to us. However, if you do not provide personal information, we may not be able to offer you all or part of our Services.
                        </P>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Information Security */}
                  <Card className="border-border/50">
                    <CardHeader>
                      <H3>Information Security</H3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <P>
                        We use commercially reasonable security technologies and procedures to help protect your personal information from unauthorized access, use, or disclosure. However, we cannot guarantee the complete safety of your information. It is your responsibility to keep your information confidential.
                      </P>
                    </CardContent>
                  </Card>

                  {/* How Long Do We Keep Your Information */}
                  <Card className="border-border/50">
                    <CardHeader>
                      <H3>How Long Do We Keep Your Information</H3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <P>
                        We retain, store, and use your information for the least amount of time necessary for our relationship with you and to provide you access to our Services in accordance with data retention policies and applicable law.
                      </P>
                    </CardContent>
                  </Card>

                  {/* Our Services Are Not Intended For Children */}
                  <Card className="border-border/50">
                    <CardHeader>
                      <H3>Our Services Are Not Intended For Children</H3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <P>
                        Our Services are not directed to children under the age of 18. We do not knowingly collect information, including personal information, from children. If we obtain actual knowledge that we have collected such information from children, then we will promptly delete it. If you believe we have mistakenly collected information from the children listed above, please contact us at operations@elevationai.com.
                      </P>
                    </CardContent>
                  </Card>

                  {/* Information for European Economic Area Residents */}
                  <Card className="border-border/50">
                    <CardHeader>
                      <H3>Information for European Economic Area Residents</H3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <P>
                        If you are a resident of the European Economic Area ("EEA"), you have certain rights and protections under applicable law regarding the processing of your personal information. The term "personal information" has the meaning given to it by the European General Data Protection Regulation ("GDPR"). When we process your personal information as described in this Privacy Policy, we will only do so when we have a legitimate interest in processing your personal information (for example, our legitimate interest in providing the Services, responding to your inquiries, or sending you marketing communications), when the processing is necessary for the performance of a contract between you and us, when the processing is necessary for us to comply with the law, or when you give us consent to process your personal information. You have the right to revoke your consent at any time. You also have the right to access personal information we hold about you and to ask that your personal information be corrected, erased, or transferred. You may also have the right to object to, or request that we restrict, certain processing. If you would like to exercise any of these rights, you may contact us as indicated below. If you have a concern about our processing of personal information that we are not able to resolve, you have the right to lodge a complaint with the data privacy authority where you reside.
                      </P>
                      <P>
                        For contact details of your local Data Protection Authority, please see: http://ec.europa.eu/justice/data-protection/article-29/structure/data-protection-authorities/index_en.htm.
                      </P>
                    </CardContent>
                  </Card>

                  {/* Your California Privacy Rights */}
                  <Card className="border-border/50">
                    <CardHeader>
                      <H3>Your California Privacy Rights</H3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <P>
                        If you are a California resident, California's "Shine the Light" law (Civil Code Section § 1798.83) permits users of our Services to request certain information regarding our disclosure of personal information to third parties for their direct marketing purposes and to opt out of sharing your personal information with such third parties. To make such a request, please send an email to operations@elevationai.com.
                      </P>
                    </CardContent>
                  </Card>

                  {/* Usage and Deletion of Personal Information */}
                  <Card className="border-border/50">
                    <CardHeader>
                      <H3>Usage and Deletion of Personal Information</H3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <P>
                        You may request what personal information we have collected, used, and disclosed about you as well as the identity of the third parties to which we have disclosed your personal information. You may also request the deletion of your personal information. Please note that we may not delete all of your information if: (1) we need it to complete a service as requested by you or perform under a contract we have with you; (2) we need such information to repair any errors to our Services or detect data security violations; or (3) we need such information to protect against fraud or illegal activity or to comply with applicable law. Please note that if we delete your personal information, we may not be able to provide you the Services with the same functionality.
                      </P>
                      <P>
                        To make any request for personal information or deletion, please send an email to operations@elevationai.com.
                      </P>
                    </CardContent>
                  </Card>

                  {/* Changes to this Privacy Policy */}
                  <Card className="border-border/50">
                    <CardHeader>
                      <H3>Changes to this Privacy Policy</H3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <P>
                        We have the discretion to update this Privacy Policy at any time. We encourage you to frequently check this page for any changes. You acknowledge and agree that it is your responsibility to review this Privacy Policy periodically and become aware of modifications. Your continued use of our Services shall be deemed an acceptance of our revised policy; provided, however, that we will provide you any notice and opportunity to accept any updates and changes as may be required under applicable law.
                      </P>
                    </CardContent>
                  </Card>

                  {/* Contact Information */}
                  <Card className="border-border/50">
                    <CardHeader>
                      <H3>You Can Contact Us</H3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <P>
                        If you have any questions about this Privacy Policy, you can email us at operations@elevationai.com.
                      </P>
                    </CardContent>
                  </Card>
                </div>

                {/* Back to Home */}
                <div className="text-center mt-12">
                  <Button asChild variant="outline" size="lg">
                    <Link href="/wireframes/home">
                      <Icon name="arrow-left-line" className="w-4 h-4 mr-2" />
                      Back to Home
                    </Link>
                  </Button>
                </div>
              </div>
            </Container>
          </Section>
        </main>
      </div>
    </PageWrapper>
  )
}
