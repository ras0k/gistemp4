#!/bin/bash

# Mask ice-impacted boxes and regrid the modified data to the equal area grid
# compile MaskRegrid.f -> MaskRegrid.exe
MaskRegrid.exe 2024 1 $(date +%Y) $(date +%m) 0.5
echo "created:" ; ls -l ERdSST_monthly

# Update SBBX.ERSSTv5 creating SBBX.ERSSTv5.upd
# Compile rearrange.ERSST.f -> rearrange.ERSST.exe and
#         trimSBBX.f        -> trimSBBX.exe
rearrange.ERSST.exe 2024 1 $(date +%Y) $(date +%m)
echo "created:" ; ls -l SBBX.ERSST.upd
trimSBBX.exe  SBBX.ERSST.upd SBBX.ERSSTv5
echo "created:" ; ls -l SBBX.ERSSTv5
# echo "removing the auxiiary files:"
# rm -f ERdSST_monthly SBBX.ERSST.upd ; # clean up
