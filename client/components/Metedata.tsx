interface Props {
    seoTitle: string;
    seoDescription: string;
  }
  
  export default function Metadata({ seoTitle, seoDescription }: Props) {
    return (
      <>
        <title>{seoTitle}</title>
        <meta name="description" content={"Belov Music - создавай треки и становись популярным" + seoDescription} />
        <meta name="robots" content="index, follow"/>
        <meta name="viewport" content="width-device-width, initial-scale=1"/>
      </>
    );
  }