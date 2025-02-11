yr=2024
while [ $yr -le 2025 ]; do
  nm=1
  while [ $nm -le 12 ]; do
    if [ $nm -lt 10 ]; then
      nm=0$nm
    fi
    wget https://www.ncei.noaa.gov/pub/data/cmb/ersst/v5/netcdf/ersst.v5.$yr$nm.nc
    nm=`expr $nm + 1`
  done
  yr=`expr $yr + 1`
done
