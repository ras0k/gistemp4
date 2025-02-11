#/bin/sh
# download ersst data from
ersst_url=https://www.ncei.noaa.gov/pub/data/cmb/ersst/v5/netcdf
#start year and end year to download
yr_start=2024
yr_end=$(date +%Y)

for iy in $(seq $yr_start $yr_end)
do
  for im in {01..12}
  do
     echo "downloading data for $iy $im"
     wget -q -nc -nd -P. -nv ${ersst_url}/ersst.v5.$iy$im.nc
  done
done