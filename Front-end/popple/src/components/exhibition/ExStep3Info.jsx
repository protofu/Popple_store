
export default function ExStep3Info({information}) {

    const h1Style = "font-bold text-[1.25rem]";
    const innerInfo = "m-6";

    const sections = [
        { title: "관람정보", content: information.notice },
        { title: "공지사항", content: information.notice },
        { title: "상세정보", content: information.detailDescription },
        { title: "상세이미지", content: information.image}
    ];


    return (
        <div className="flex flex-col gap-8 mb-[2rem] mx-12 mt-12 h-full">
            {sections.map((section, index) => (
                <div key={index}>
                    <h1 className={h1Style}>{section.title}</h1>
                    <div className={innerInfo}>
                        {section.title === "상세이미지" ? (<img src={URL.createObjectURL(information.poster)}/>): (section.content)}</div>
                </div>
            ))}
        </div>
    );
}