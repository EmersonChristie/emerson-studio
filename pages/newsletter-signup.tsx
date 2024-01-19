import PageLayout from "@/components/shared/page-layout";
import { NewsletterSignupForm } from "@/components/shared/newsletter-signup-form";

const NewsletterSignupPage = () => {
  return (
    <PageLayout title="Newsletter Signup">
      <div id="main-content" className="flex w-full flex-col gap-20">
        <div
          id="introduction"
          className="flex flex-col items-center justify-center gap-20 md:flex-row"
        >
          <div className="w-full">
            <NewsletterSignupForm />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default NewsletterSignupPage;
