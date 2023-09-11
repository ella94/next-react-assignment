import recruitList from '@data/recruitCompanyData.json';

type pageProps = {
  params?: {
    id: number;
  };
};

export default async function Page({ params }: pageProps) {
  const data = recruitList.find((input) => input.id == params?.id);

  return (
    <div className="space-y-4">
      <h1>채용공고 : {data?.title}</h1>
      <p>회사명 : {data?.companyName}</p>
      <p>회사소개 : {data?.aboutCompany}</p>
    </div>
  );
}
