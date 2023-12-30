# Machine Learning

## Algorithmic Trading

[Youtube video](https://www.youtube.com/watch?v=9Y3yaoi9rUQ)
[Source code](https://github.com/kpunith8/Algorithmic_Trading_Machine_Learning/blob/main/Algorithmic_Trading_Machine_Learning_Quant_Strategies.ipynb)

Use `log()` function from `numpy` to calculate the log of a number.

```py
import numpy as np
# Use this lib for calculating rsa and other technical indicators in python
import pandas_ta

# df is a dataframe gatherd from internet or loaded by pandas library
df['garman_klass_volatility'] = ((np.log(df['high'])-np.log(df['low']))**2)/2-(2*np.log(2)-1)*((np.log(df['adj close'])-np.log(df['open']))**2)

df['rsi'] = df.groupby(level=1)['adj close'].transform(lambda x: pandas_ta.rsi(close=x, length=20))

# To plot the RSI calculated above as a graph 
df.xs('AAPL', level=1)['rsi'].plot()
```
