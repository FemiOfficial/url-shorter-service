import app from './createApp';
import { PORT } from './consts';

app.listen(PORT, () => console.log(`API listening on port ${PORT}`));