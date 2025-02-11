program convert_ersst
  implicit none
  integer, parameter :: nx = 180, ny = 89
  integer :: mon, i, j, year
  integer :: isst(nx, ny)
  real    :: rsst(nx, ny)
  character(len=80) :: header
  character(len=4)  :: cyr
  character(len=2)  :: cmon
  character(len=40) :: outfilename
  character(len=40) :: infilename

  ! Loop over the two years.
  do year = 2024, 2025
     ! Construct the input file name for the current year.
     write(cyr, '(I4.4)') year
     infilename = "ersst.v5." // trim(cyr) // ".asc"
     open(unit=51, file=infilename, status='old')

     do mon = 1, 12
        print*, 'Processing year', year, 'month', mon

        ! Read one block (month) of data: 180 rows of 89 integers each.
        do i = 1, nx
           read(51, 81) (isst(i, j), j = 1, ny)
        end do

        ! Convert integer values to real values (scale by 1/100) unless missing.
        do i = 1, nx
           do j = 1, ny
              if (isst(i, j) > -900) then
                 rsst(i, j) = real(isst(i, j)) / 100.0
              else
                 rsst(i, j) = -999.9
              end if
           end do
        end do

        ! Create an 80-character header (initially all blanks)
        header = '                                                                                '
        ! Place the year (columns 41-44) and month (columns 46-47) into the header.
        write(header(41:44), '(I4.4)') year
        write(header(46:47), '(I2.2)') mon

        ! Construct the output filename:
        ! The file name will be "./input_files/ersst.v5.yyyymm.bin"
        write(cyr, '(I4.4)') year
        write(cmon, '(I2.2)') mon
        outfilename = "./input_files/ersst.v5." // trim(cyr) // trim(cmon) // ".bin"

        ! Open the output file (for each month we create a new file)
        open(unit=61, file=outfilename, status='replace', form='unformatted')
        ! Write a single record containing the header and the data array.
        write(61) header, rsst
        close(61)
     end do

     close(51)
  end do

  stop
81 format (89i6)
end program convert_ersst
