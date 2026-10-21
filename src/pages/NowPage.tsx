import PageWrapper from '../components/PageWrapper';
import NowSection from '../sections/NowSection';

export default function NowPage() {
  return (
    <PageWrapper crumb="Now">
      <NowSection />
    </PageWrapper>
  );
}
