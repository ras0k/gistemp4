yr=2008
while [ $yr -le 2025 ]; do
  nm=1
  wget https://www.ncei.noaa.gov/pub/data/cmb/ersst/v5/ascii/ersst.v5.$yr.asc
  nm=`expr $nm + 1`
  done
  yr=`expr $yr + 1`
done
