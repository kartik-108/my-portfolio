import PageWrapper from '../components/PageWrapper';
import NotFoundInline from '../components/NotFoundInline';

export default function NotFound() {
  return (
    <PageWrapper>
      <NotFoundInline backTo="/" backLabel="Back home" subject="page" />
    </PageWrapper>
  );
}
