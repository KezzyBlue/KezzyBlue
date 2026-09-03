export const hanoiTower = (x) => {

    const result = [];
    function backtrack(x, start, end)
    {
        if(x == 1){
            result.push({"start": start, "end": end});
            return;
        }
        let mid = 6 - start - end;
        backtrack(x - 1, start, mid);
        result.push({"start": start, "end": end});
        backtrack(x - 1, mid, end);
    }
    backtrack(x, 1, 3);

    return result;
}