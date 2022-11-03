
export default function calculateSuccessChance({target, diceCount = 1, diceSize = 20, modifier = 0, disadvantage = false} :{target: number, diceCount: number, diceSize: number, modifier: number, disadvantage: boolean})
{
let total = 0;
let success = 0;

function dive(count: number, size: number, carry: any[] = []): any[] {
  const output = [];

  for (let i = 1; i <= size; i++) {
    if (count > 1) {
      output.push(dive(count - 1, size, [...carry, i]));
    } else {
      const result =
        ([...carry, i].reduce((prev, curr) =>
          disadvantage
            ? Math.min(prev ?? size, curr)
            : Math.max(prev ?? 0, curr)
        ) +
          modifier) >=
        target;

      if (result) success++;
      total++;

      output.push(result);
    }
  }
  return output;
};

dive(diceCount, diceSize);

return ((100 * success) / total).toFixed(2)

}