import { Edge } from 'api';

// https://github.com/commonsense/conceptnet5/wiki/Relations
const sentenceData = {
  RelatedTo: "###は@@@に関連する",
  IsA: "###はほぼ@@@である",
  PartOf: "###は@@@の一部である",
  HasA: "###は@@@がある",
  UsedFor: "###は@@@に使用される",
  CapableOf: "###は@@@ができる",
  AtLocation: "###といえば@@@である",
  Causes: "###は@@@を引き起こす",
  HasSubevent: "###は@@@に関連する",
  HasFirstSubevent: "###にはまず@@@である",
  HasLastSubevent: "###の最後は@@@である",
  HasPrerequisite: "###が起きるには@@@が起こる必要がある",
  HasProperty: "###は@@@",
  MotivatedByGoal: "###するなら@@@だ",
  ObstructedBy: "###は@@@で妨げられる",
  Desires: "###は@@@したいものだ",
  CreatedBy: "###は@@@から作られる",
  Synonym: "###は@@@と同じ意味だ",
  Antonym: "###は@@@の対義語だ",
  DistinctFrom: "###は@@@とは異なる",
  DerivedFrom: "###を@@@に分けられる",
  SymbolOf: "###は@@@の象徴だ",
  DefinedAs: "###は@@@と定義されている",
  MannerOf: "",
  LocatedNear: "###は@@@の近くにある",
  HasContext: "###は@@@で使用される単語だ",
  SimilarTo: "###は@@@に似ている",
  EtymologicallyRelatedTo: "###は@@@に語源的に関連している",
  EtymologicallyDerivedFrom: "",
  CausesDesire: "###であれば@@@",
  MadeOf: "###は@@@から出来ている",
  ReceivesAction: "###は@@@出来る。",
};

export const makeSentence = (edge: Edge): string => {
  const start = edge.start.label.replace(" ", "");
  const end = edge.end.label.replace(" ", "");
  const rel = edge.rel.label;
  const sentence = sentenceData[rel] ? sentenceData[rel].replace("###", start).replace("@@@", end) : "";
  console.log(`${rel}:${sentence}`);
  return sentence;
};
