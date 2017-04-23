install('dplyr')
library(dplyr)

data.2016 <- read.csv('2016.csv', stringsAsFactors = FALSE)
View(data.2016)

write.csv(data.2016, '2016.csv', row.names = FALSE)