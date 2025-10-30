// 일반화된 변환 함수 생성기
export const createMapper = <T extends string, U>(mapping: Record<T, U>): ((key: T) => U) => {
  return (key: T) => mapping[key]
}
