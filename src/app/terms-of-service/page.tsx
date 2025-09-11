"use client"

import React from "react"
import { PageWrapper } from "@/components/page-wrapper"
import { Container } from "@/components/ui/layout/container"
import { Section } from "@/components/ui/layout/section"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { H1, H3, BodyLarge, BodySmall, P } from "@/components/ui/typography"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"
import Link from "next/link"
import { GlobalHeader } from "@/components/ui/global-header"

export default function TermsOfServicePage() {
  return (
    <PageWrapper>
      <div className="min-h-screen bg-background transition-colors duration-300">
        {/* Global Header */}
        <GlobalHeader showLogin={true} showDemo={false} />

        <main className="flex-1">
          <Section paddingY="xl">
            <Container>
              <div className="max-w-4xl mx-auto">
                {/* Page Header */}
                <div className="text-center space-y-6 mb-12">
                  <H1 className="font-bold">
                    Terms and Conditions of Service
                  </H1>
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
                        Welcome to elevationai.com (the "Site"), which is owned and operated by Elevation AI, Inc ("Elevation AI", "we" or "us").
                      </P>
                      <P className="font-semibold text-foreground">
                        PLEASE READ THESE TERMS AND CONDITIONS OF SERVICE CAREFULLY AS THEY CONTAIN IMPORTANT INFORMATION REGARDING YOUR LEGAL RIGHTS, REMEDIES, AND OBLIGATIONS BY USING OUR SERVICES.
                      </P>
                      <P>
                        These terms of use (this "Agreement" or these "Terms") form a binding agreement between you as a user and natural person and entity or sole proprietor on whose behalf an account is created (collectively, "user," you" or "your") and us and shall be the equivalent of a written paper agreement between you and us. The effective date of this Agreement is when you accept or are deemed to accept this Agreement as discussed below.
                      </P>
                      <P>
                        These Terms apply to your use of our services and software provided on our Site, our mobile applications (the "App"), any services, content, communications, and product features relating to the Site and the App (collectively with the Site and the App, the "Services").
                      </P>
                      <P className="font-semibold text-foreground">
                        NOTE: THESE TERMS CONTAIN A BINDING ARBITRATION PROVISION WITH A CLASS ACTION WAIVER AND A WAIVER OF THE RIGHT TO A JURY. PLEASE REVIEW SECTION 19 BELOW BEFORE DOWNLOADING OR USING OUR SERVICES.
                      </P>
                      <P>
                        We reserve the right to make modifications to these Terms at any time and for any reason. Please check these Terms regularly to ensure you are aware of any modifications made by us. By continuing to access or use the Services after those revisions become effective, you agree to be bound by the revised Terms. If you do not agree to these Terms of Service, you must immediately stop using our services.
                      </P>
                    </CardContent>
                  </Card>

                  {/* General */}
                  <Card className="border-border/50">
                    <CardHeader>
                      <H3>General</H3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <P>
                        Subject to the terms of this Agreement, you are responsible for your use of the Services, and for any information, content, reports, data, databases, graphics, interfaces, web pages, text, files, software, product names, company names, trademarks, logos and trade-names (collectively, the "Content") you post to the Services, any Content you access from the Services, and for any consequences thereof. You acknowledge and agree that we may modify, update, and otherwise change the Services at any time at our sole discretion.
                      </P>
                    </CardContent>
                  </Card>

                  {/* Privacy */}
                  <Card className="border-border/50">
                    <CardHeader>
                      <H3>Privacy</H3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <P>
                        By accessing or using the Services, you intend to and expressly agree to be bound by all the terms and conditions of this Agreement and our Privacy Policy (the "Privacy Policy"), which is incorporated herein by reference. If you do not agree to these terms and conditions, you may not use the Services. Any information that you provide to us is subject to the Privacy Policy, which governs our collection and use of your information. You understand that through your use of the Services you consent to the collection and use of your information as set forth in the Privacy Policy.
                      </P>
                    </CardContent>
                  </Card>

                  {/* Accounts */}
                  <Card className="border-border/50">
                    <CardHeader>
                      <H3>Accounts</H3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <P>
                        Some Services offered by us require you to create an account. If you create an account, you agree that all the information you provide will be true and accurate and that you have the authority to create the account. You are responsible for keeping your account information secure and confidential. You agree to inform us immediately if you suspect that your account or login information has been compromised. If you provide us with an email address as part of an account creation, we may furnish you with written correspondence regarding your account and/or other Elevation AI-related material, including promotional materials.
                      </P>
                    </CardContent>
                  </Card>

                  {/* Eligibility */}
                  <Card className="border-border/50">
                    <CardHeader>
                      <H3>Eligibility</H3>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <P>
                        You may provide access to the Services to other users within your organization as authorized by us and/or by your subscription level to our Services in place from time to time (each, an "Authorized User"). You are solely responsible for Authorized User activities and interaction with the Services. You agree to ensure all Authorized Users are aware of all restrictions of use in these Terms, the Privacy Policy, and any other rules or requirements applicable to the Services. You agree to cause Authorized Users to comply with such provisions. You are solely responsible for all actions taken by and interactions with Authorized Users, including providing any disclosures governing an Authorized User's interaction with the Services, and any applicable Privacy Policy or further obligations required by us or any applicable law. Any obligation imposed on you by these Terms shall be applicable to you and to any Authorized User.
                      </P>
                      
                      <div>
                        <H3 className="font-semibold mb-3">By using our Services, you represent and warrant that you and each Authorized User:</H3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li>• If an individual, are at least 18 years old;</li>
                          <li>• Are legally qualified to enter a binding contract with us;</li>
                          <li>• Are not located in a country that is subject to a U.S. Government embargo, or that has been designated by the U.S. Government as a "terrorist supporting" country;</li>
                          <li>• Are not on any list of individuals prohibited from conducting business with the United States;</li>
                          <li>• Are not prohibited by law from using our Services;</li>
                          <li>• Do not have more than one account on our Services; and</li>
                          <li>• Have not previously been removed from our Services by us, unless you have our express written permission to create a new account.</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Acceptable Use */}
                  <Card className="border-border/50">
                    <CardHeader>
                      <H3>Acceptable Use</H3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <P>
                        You agree not to use the Services to:
                      </P>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Violate any applicable federal, state, local, or international law or regulation;</li>
                        <li>• Transmit, or procure the sending of, any advertising or promotional material, including any "junk mail," "chain letter," "spam," or any other similar solicitation;</li>
                        <li>• Impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity;</li>
                        <li>• Engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the Services, or which, as determined by us, may harm the Company or users of the Services or expose them to liability;</li>
                        <li>• Use the Services in any manner that could disable, overburden, damage, or impair the site or interfere with any other party's use of the Services;</li>
                        <li>• Use any robot, spider, or other automatic device, process, or means to access the Services for any purpose, including monitoring or copying any of the material on the Services;</li>
                        <li>• Introduce any viruses, trojan horses, worms, logic bombs, or other material which is malicious or technologically harmful;</li>
                        <li>• Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the Services, the server on which the Services are stored, or any server, computer, or database connected to the Services;</li>
                        <li>• Attack the Services via a denial-of-service attack or a distributed denial-of-service attack;</li>
                        <li>• Otherwise attempt to interfere with the proper working of the Services.</li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Intellectual Property Rights */}
                  <Card className="border-border/50">
                    <CardHeader>
                      <H3>Intellectual Property Rights</H3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <P>
                        The Services and their entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by the Company, its licensors, or other providers of such material and are protected by United States and international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
                      </P>
                      <P>
                        These Terms permit you to use the Services for your personal, non-commercial use only. You must not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Services, except as follows:
                      </P>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Your computer may temporarily store copies of such materials in RAM incidental to your accessing and viewing those materials;</li>
                        <li>• You may store files that are automatically cached by your Web browser for display enhancement purposes;</li>
                        <li>• You may print or download one copy of a reasonable number of pages of the Services for your own personal, non-commercial use and not for further reproduction, publication, or distribution.</li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* User Contributions */}
                  <Card className="border-border/50">
                    <CardHeader>
                      <H3>User Contributions</H3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <P>
                        The Services may contain message boards, chat rooms, personal web pages or profiles, forums, bulletin boards, and other interactive features (collectively, "Interactive Services") that allow users to post, submit, publish, display, or transmit to other users or other persons (hereinafter, "post") content or materials (collectively, "User Contributions") on or through the Services.
                      </P>
                      <P>
                        All User Contributions must comply with the Content Standards set out in these Terms of Service. Any User Contribution you post will be considered non-confidential and non-proprietary. By providing any User Contribution on the Services, you grant us and our affiliates and service providers, and each of their and our respective licensees, successors, and assigns the right to use, reproduce, modify, perform, display, distribute, and otherwise disclose to third parties any such material.
                      </P>
                    </CardContent>
                  </Card>

                  {/* Content Standards */}
                  <Card className="border-border/50">
                    <CardHeader>
                      <H3>Content Standards</H3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <P>
                        All User Contributions must comply with all applicable federal, state, local, and international laws and regulations. Without limiting the foregoing, User Contributions must not:
                      </P>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Contain any defamatory, obscene, indecent, abusive, offensive, harassing, violent, hateful, inflammatory, or otherwise objectionable material;</li>
                        <li>• Promote sexually explicit or pornographic material, violence, or discrimination based on race, sex, religion, nationality, disability, sexual orientation, or age;</li>
                        <li>• Infringe any patent, trademark, trade secret, copyright, or other intellectual property or other rights of any other person;</li>
                        <li>• Violate the legal rights (including the rights of publicity and privacy) of others or contain any material that could give rise to any civil or criminal liability under applicable laws or regulations or that otherwise may be in conflict with these Terms of Service and our Privacy Policy;</li>
                        <li>• Be likely to deceive any person;</li>
                        <li>• Promote any illegal activity, or advocate, promote, or assist any unlawful act;</li>
                        <li>• Cause annoyance, inconvenience, or needless anxiety or be likely to upset, embarrass, alarm, or annoy any other person;</li>
                        <li>• Impersonate any person, or misrepresent your identity or affiliation with any person or organization;</li>
                        <li>• Involve commercial activities or sales, such as contests, sweepstakes, and other sales promotions, barter, or advertising;</li>
                        <li>• Give the impression that they emanate from or are endorsed by us or any other person or entity, if this is not the case.</li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Monitoring and Enforcement */}
                  <Card className="border-border/50">
                    <CardHeader>
                      <H3>Monitoring and Enforcement</H3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <P>
                        We have the right to:
                      </P>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Remove or refuse to post any User Contributions for any or no reason in our sole discretion;</li>
                        <li>• Take any action with respect to any User Contribution that we deem necessary or appropriate in our sole discretion, including if we believe that such User Contribution violates the Terms of Service, including the Content Standards, infringes any intellectual property right or other right of any person or entity, threatens the personal safety of users of the Services or the public, or could create liability for the Company;</li>
                        <li>• Disclose your identity or other information about you to any third party who claims that material posted by you violates their rights, including their intellectual property rights or their right to privacy;</li>
                        <li>• Take appropriate legal action, including without limitation, referral to law enforcement, for any illegal or unauthorized use of the Services;</li>
                        <li>• Terminate or suspend your access to all or part of the Services for any or no reason, including without limitation, any violation of these Terms of Service.</li>
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Copyright Infringement */}
                  <Card className="border-border/50">
                    <CardHeader>
                      <H3>Copyright Infringement</H3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <P>
                        If you believe that any User Contributions violate your copyright, please see our Copyright Policy for instructions on sending us a notice of copyright infringement. It is the policy of the Company to terminate the user accounts of repeat infringers.
                      </P>
                    </CardContent>
                  </Card>

                  {/* Reliance on Information Posted */}
                  <Card className="border-border/50">
                    <CardHeader>
                      <H3>Reliance on Information Posted</H3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <P>
                        The information presented on or through the Services is made available solely for general information purposes. We do not warrant the accuracy, completeness, or usefulness of this information. Any reliance you place on such information is strictly at your own risk. We disclaim all liability and responsibility arising from any reliance placed on such materials by you or any other visitor to the Services, or by anyone who may be informed of any of its contents.
                      </P>
                      <P>
                        This Services may include content provided by third parties, including materials provided by other users, bloggers, and third-party licensors, syndicators, aggregators, and/or reporting services. All statements and/or opinions expressed in these materials, and all articles and responses to questions and other content, other than the content provided by the Company, are solely the opinions and the responsibility of the person or entity providing those materials. These materials do not necessarily reflect the opinion of the Company. We are not responsible, or liable to you or any third party, for the content or accuracy of any materials provided by any third parties.
                      </P>
                    </CardContent>
                  </Card>

                  {/* Changes to the Services */}
                  <Card className="border-border/50">
                    <CardHeader>
                      <H3>Changes to the Services</H3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <P>
                        We may update the content on this Services from time to time, but its content is not necessarily complete or up-to-date. Any of the material on the Services may be out of date at any given time, and we are under no obligation to update such material.
                      </P>
                    </CardContent>
                  </Card>

                  {/* Information About You and Your Visits to the Services */}
                  <Card className="border-border/50">
                    <CardHeader>
                      <H3>Information About You and Your Visits to the Services</H3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <P>
                        All information we collect on this Services is subject to our Privacy Policy. By using the Services, you consent to all actions taken by us with respect to your information in compliance with the Privacy Policy.
                      </P>
                    </CardContent>
                  </Card>

                  {/* Online Purchases and Other Terms and Conditions */}
                  <Card className="border-border/50">
                    <CardHeader>
                      <H3>Online Purchases and Other Terms and Conditions</H3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <P>
                        Additional terms and conditions may apply to purchases of goods or services and to specific portions or features of the Services, including contests, promotions, or other similar features, all of which terms are made a part of these Terms of Service by this reference. You agree to abide by such other terms and conditions, including where applicable representing that you are of sufficient legal age to use or participate in such service or feature. If there is a conflict between these Terms of Service and the terms posted for or applicable to a specific portion of the Services or for any service offered on or through the Services, the latter terms shall control with respect to your use of that portion of the Services or the specific service.
                      </P>
                      <P>
                        The Company's obligations, if any, with regard to its products and services are governed solely by the agreements pursuant to which they are provided, and nothing on this Services should be construed to alter such agreements.
                      </P>
                      <P>
                        The Company may make changes to any products or services offered on the Services, or to the applicable prices for any such products or services, at any time, without notice. The materials on the Services with respect to products and services may be out of date, and the Company makes no commitment to update the materials on the Services with respect to such products and services.
                      </P>
                    </CardContent>
                  </Card>

                  {/* Linking to the Services and Social Media Features */}
                  <Card className="border-border/50">
                    <CardHeader>
                      <H3>Linking to the Services and Social Media Features</H3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <P>
                        You may link to our homepage, provided you do so in a way that is fair and legal and does not damage our reputation or take advantage of it, but you must not establish a link in such a way as to suggest any form of association, approval, or endorsement on our part without our express written consent.
                      </P>
                      <P>
                        This Services may provide certain social media features that enable you to:
                      </P>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Link from your own or certain third-party websites to certain content on this Services;</li>
                        <li>• Send e-mails or other communications with certain content, or links to certain content, on this Services;</li>
                        <li>• Cause limited portions of content on this Services to be displayed or appear to be displayed on your own or certain third-party websites.</li>
                      </ul>
                      <P>
                        You may use these features solely as they are provided by us, solely with respect to the content they are displayed with, and otherwise in accordance with any additional terms and conditions we provide with respect to such features. Subject to the foregoing, you must not:
                      </P>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Establish a link from any website that is not owned by you;</li>
                        <li>• Cause the Services or portions of it to be displayed, or appear to be displayed by, for example, framing, deep linking, or in-line linking, on any other site;</li>
                        <li>• Link to any part of the Services other than the homepage;</li>
                        <li>• Otherwise take any action with respect to the materials on this Services that is inconsistent with any other provision of these Terms of Service.</li>
                      </ul>
                      <P>
                        You agree to cooperate with us in causing any unauthorized framing or linking immediately to cease. We reserve the right to withdraw linking permission without notice.
                      </P>
                      <P>
                        We may disable all or any social media features and any links at any time without notice in our discretion.
                      </P>
                    </CardContent>
                  </Card>

                  {/* Links from the Services */}
                  <Card className="border-border/50">
                    <CardHeader>
                      <H3>Links from the Services</H3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <P>
                        If the Services contain links to other sites and resources provided by third parties, these links are provided for your convenience only. This includes links contained in advertisements, including banner advertisements and sponsored links. We have no control over the contents of those sites or resources, and accept no responsibility for them or for any loss or damage that may arise from your use of them. If you decide to access any of the third-party websites linked to this Services, you do so entirely at your own risk and subject to the terms and conditions of use for such websites.
                      </P>
                    </CardContent>
                  </Card>

                  {/* Geographic Restrictions */}
                  <Card className="border-border/50">
                    <CardHeader>
                      <H3>Geographic Restrictions</H3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <P>
                        The owner of the Services is based in the state of California in the United States. We provide this Services for use only by persons located in the United States. We make no claims that the Services or any of their content is accessible or appropriate outside of the United States. Access to the Services may not be legal by certain persons or in certain countries. If you access the Services from outside the United States, you do so on your own initiative and are responsible for compliance with local laws.
                      </P>
                    </CardContent>
                  </Card>

                  {/* Disclaimer of Warranties */}
                  <Card className="border-border/50">
                    <CardHeader>
                      <H3>Disclaimer of Warranties</H3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <P>
                        You understand that we cannot and do not guarantee or warrant that files available for downloading from the internet or the Services will be free of viruses or other destructive code. You are responsible for implementing sufficient procedures and checkpoints to satisfy your particular requirements for anti-virus protection and accuracy of data input and output, and for maintaining a means external to our site for any reconstruction of any lost data.
                      </P>
                      <P>
                        TO THE FULLEST EXTENT PROVIDED BY LAW, WE WILL NOT BE LIABLE FOR ANY LOSS OR DAMAGE CAUSED BY A DISTRIBUTED DENIAL-OF-SERVICE ATTACK, VIRUSES, OR OTHER TECHNOLOGICALLY HARMFUL MATERIAL THAT MAY INFECT YOUR COMPUTER EQUIPMENT, COMPUTER PROGRAMS, DATA, OR OTHER PROPRIETARY MATERIAL DUE TO YOUR USE OF THE SERVICES OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE SERVICES OR TO YOUR DOWNLOADING OF ANY MATERIAL POSTED ON IT, OR ON ANY SERVICES LINKED TO IT.
                      </P>
                      <P>
                        YOUR USE OF THE SERVICES, THEIR CONTENT, AND ANY SERVICES OR ITEMS OBTAINED THROUGH THE SERVICES IS AT YOUR OWN RISK. THE SERVICES, THEIR CONTENT, AND ANY SERVICES OR ITEMS OBTAINED THROUGH THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. NEITHER THE COMPANY NOR ANY PERSON ASSOCIATED WITH THE COMPANY MAKES ANY WARRANTY OR REPRESENTATION WITH RESPECT TO THE COMPLETENESS, SECURITY, RELIABILITY, QUALITY, ACCURACY, OR AVAILABILITY OF THE SERVICES. WITHOUT LIMITING THE FOREGOING, NEITHER THE COMPANY NOR ANYONE ASSOCIATED WITH THE COMPANY REPRESENTS OR WARRANTS THAT THE SERVICES, THEIR CONTENT, OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE SERVICES WILL BE ACCURATE, RELIABLE, ERROR-FREE, OR UNINTERRUPTED, THAT DEFECTS WILL BE CORRECTED, THAT OUR SITE OR THE SERVER THAT MAKES IT AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS, OR THAT THE SERVICES OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE SERVICES WILL OTHERWISE MEET YOUR NEEDS OR EXPECTATIONS.
                      </P>
                      <P>
                        TO THE FULLEST EXTENT PROVIDED BY LAW, THE COMPANY HEREBY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT, AND FITNESS FOR PARTICULAR PURPOSE.
                      </P>
                      <P>
                        THE FOREGOING DOES NOT AFFECT ANY WARRANTIES WHICH CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW.
                      </P>
                    </CardContent>
                  </Card>

                  {/* Limitation on Liability */}
                  <Card className="border-border/50">
                    <CardHeader>
                      <H3>Limitation on Liability</H3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <P>
                        TO THE FULLEST EXTENT PROVIDED BY LAW, IN NO EVENT WILL THE COMPANY, ITS AFFILIATES, OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE SERVICES, ANY SERVICES LINKED TO IT, ANY CONTENT ON THE SERVICES OR SUCH OTHER SERVICES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO, PERSONAL INJURY, PAIN AND SUFFERING, EMOTIONAL DISTRESS, LOSS OF REVENUE, LOSS OF PROFITS, LOSS OF BUSINESS OR ANTICIPATED SAVINGS, LOSS OF USE, LOSS OF GOODWILL, LOSS OF DATA, AND WHETHER CAUSED BY TORT (INCLUDING NEGLIGENCE), BREACH OF CONTRACT, OR OTHERWISE, EVEN IF FORESEEABLE.
                      </P>
                      <P>
                        THE FOREGOING DOES NOT AFFECT ANY LIABILITY WHICH CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW.
                      </P>
                    </CardContent>
                  </Card>

                  {/* Indemnification */}
                  <Card className="border-border/50">
                    <CardHeader>
                      <H3>Indemnification</H3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <P>
                        You agree to defend, indemnify, and hold harmless the Company, its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms of Service or your use of the Services, including, but not limited to, your User Contributions, any use of the Services' content, services, and products other than as expressly authorized in these Terms of Service, or your use of any information obtained from the Services.
                      </P>
                    </CardContent>
                  </Card>

                  {/* Governing Law and Jurisdiction */}
                  <Card className="border-border/50">
                    <CardHeader>
                      <H3>Governing Law and Jurisdiction</H3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <P>
                        All matters relating to the Services and these Terms of Service, and any dispute or claim arising therefrom or related thereto (in each case, including non-contractual disputes or claims), shall be governed by and construed in accordance with the internal laws of the State of California without giving effect to any choice or conflict of law provision or rule (whether of the State of California or any other jurisdiction).
                      </P>
                      <P>
                        Any legal suit, action, or proceeding arising out of, or related to, these Terms of Service or the Services shall be instituted exclusively in the federal courts of the United States or the courts of the State of California, in each case located in the City of San Francisco and County of San Francisco, although we retain the right to bring any suit, action, or proceeding against you for breach of these Terms of Service in your country of residence or any other relevant country. You waive any and all objections to the exercise of jurisdiction over you by such courts and to venue in such courts.
                      </P>
                    </CardContent>
                  </Card>

                  {/* Arbitration */}
                  <Card className="border-border/50">
                    <CardHeader>
                      <H3>Arbitration</H3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <P>
                        At Company's sole discretion, it may require you to submit any disputes arising from the use of these Terms of Service or the Services, including disputes arising from or concerning their interpretation, violation, invalidity, non-performance, or termination, to final and binding arbitration under the Rules of Arbitration of the American Arbitration Association applying California law.
                      </P>
                    </CardContent>
                  </Card>

                  {/* Limitation on Time to File Claims */}
                  <Card className="border-border/50">
                    <CardHeader>
                      <H3>Limitation on Time to File Claims</H3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <P>
                        ANY CAUSE OF ACTION OR CLAIM YOU MAY HAVE ARISING OUT OF OR RELATING TO THESE TERMS OF SERVICE OR THE SERVICES MUST BE COMMENCED WITHIN ONE (1) YEAR AFTER THE CAUSE OF ACTION ACCRUES, OTHERWISE SUCH CAUSE OF ACTION OR CLAIM IS PERMANENTLY BARRED.
                      </P>
                    </CardContent>
                  </Card>

                  {/* Waiver and Severability */}
                  <Card className="border-border/50">
                    <CardHeader>
                      <H3>Waiver and Severability</H3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <P>
                        No waiver by the Company of any term or condition set out in these Terms of Service shall be deemed a further or continuing waiver of such term or condition or a waiver of any other term or condition, and any failure of the Company to assert a right or provision under these Terms of Service shall not constitute a waiver of such right or provision.
                      </P>
                      <P>
                        If any provision of these Terms of Service is held by a court or other tribunal of competent jurisdiction to be invalid, illegal, or unenforceable for any reason, such provision shall be eliminated or limited to the minimum extent such that the remaining provisions of the Terms of Service will continue in full force and effect.
                      </P>
                    </CardContent>
                  </Card>

                  {/* Entire Agreement */}
                  <Card className="border-border/50">
                    <CardHeader>
                      <H3>Entire Agreement</H3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <P>
                        The Terms of Service, our Privacy Policy, and any other agreements incorporated by reference constitute the sole and entire agreement between you and Elevation AI, Inc. regarding the Services and supersede all prior and contemporaneous understandings, agreements, representations, and warranties, both written and oral, regarding the Services.
                      </P>
                    </CardContent>
                  </Card>

                  {/* Your Comments and Concerns */}
                  <Card className="border-border/50">
                    <CardHeader>
                      <H3>Your Comments and Concerns</H3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <P>
                        This Services is operated by Elevation AI, Inc., 2261 Market Street #5021, San Francisco, CA 94114.
                      </P>
                      <P>
                        All feedback, comments, requests for technical support, and other communications relating to the Services should be directed to: operations@elevationai.com.
                      </P>
                    </CardContent>
                  </Card>
                </div>

                {/* Back to Home */}
                <div className="text-center mt-12">
                  <Button asChild variant="outline" size="lg">
                    <Link href="/website/home">
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
